package com.unflow.reactnative

import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.unflow.androidsdk.UnflowSdk
import com.unflow.androidsdk.ui.theme.Fonts
import kotlinx.coroutines.*

class UnflowModule(
  private val reactContext: ReactApplicationContext,
  private val scope: CoroutineScope = CoroutineScope(SupervisorJob() + Dispatchers.Default)
) : ReactContextBaseJavaModule(reactContext) {

  private var openerJobs: MutableSet<Job> = mutableSetOf()

    override fun getName(): String {
        return "Unflow"
    }

    @ReactMethod
    fun initialize(apiKey: String, enableLogging: Boolean) {
      val application = currentActivity?.application
      if (application == null) {
        Log.e("UNFLOW", "Unable to initialize Unflow as we have no activity :(")
        return
      }
      if (!UnflowSdk.isInitialized) {
        UnflowSdk.initialize(
          application = application,
          config = UnflowSdk.Config(apiKey, enableLogging),
          analyticsListener = null,
          activityProvider = CurrentActivityProvider { currentActivity }
        )
      }
    }

    @ReactMethod
    fun sync() {
      UnflowSdk.client().sync()
    }

    @ReactMethod
    fun setUserId(userId: String) {
      UnflowSdk.client().setUserId(userId = userId)
    }

    @Suppress("UNCHECKED_CAST")
    @ReactMethod
    fun setAttributes(attributes: ReadableMap) {
      val attributesMap = attributes.toHashMap() as? Map<String, Any>
      val stringAttributes = attributesMap?.filterValues { it is String } as? Map<String, String>
      if (stringAttributes != null) {
        UnflowSdk.client().setAttributes(attributes = stringAttributes)
      }
    }

    @ReactMethod
    fun setCustomFonts(fonts: ReadableMap) {
      UnflowSdk.client().setCustomFonts(fonts = Fonts(
          title = fonts.getFontResId("title"),
          body = fonts.getFontResId("body"),
          button = fonts.getFontResId("button"),
          openerTitle = fonts.getFontResId("openerTitle"),
          openerSubtitle = fonts.getFontResId("openerSubtitle"),
        )
      )
    }

    @ReactMethod
    fun openScreen(screenId: Int) {
      UnflowSdk.client().openScreen(screenId = screenId.toLong())
    }

    @ReactMethod
    fun trackEvent(eventName: String, metadata: ReadableMap) {
      val mappedMetadata = metadata.toHashMap() as? Map<String, Any?>
      if (mappedMetadata != null) {
        UnflowSdk.client().trackEvent(eventName, mappedMetadata)
      } else {
        UnflowSdk.client().trackEvent(eventName)
      }
    }

    @ReactMethod
    fun deregisterToken() {
      UnflowSdk.client().deregisterPushToken()
    }

    @ReactMethod
    @Suppress("UNUSED_PARAMETER")
    fun addListener(eventName: String) {}

    @ReactMethod
    fun removeListeners(count: Int) {
      if (count == 0) {
        openerJobs.forEach { it.cancel() }
      }
      openerJobs.clear()
    }

    @ReactMethod
    fun subscribe(subscriptionId: String) {
      val job = scope.launch {
        UnflowSdk.client().openers().collect {
          val openerList = WritableNativeArray()

          it.forEach {
            val map = WritableNativeMap()
            map.putInt("id", it.screenId.toInt())
            map.putString("title", it.title)
            map.putInt("priority", it.priority)
            map.putString("subtitle", it.subtitle)
            map.putString("imageURL", it.imageUrl)
            openerList.pushMap(map)
          }

          val arguments = Arguments.createMap()
          arguments.putArray(subscriptionId, openerList)

          reactContext
            .getJSModule(RCTDeviceEventEmitter::class.java)
            .emit("OpenersChanged", arguments)
        }
      }
      openerJobs.add(job)
    }

    private fun ReadableMap.getFontResId(key: String): Int? {
      if (!hasKey(key)) return null

      val fontId = reactContext.resources.getIdentifier(getString(key), "font", reactContext.packageName)
      if (fontId != 0) return fontId

      val fontsId = reactContext.resources.getIdentifier(getString(key), "fonts", reactContext.packageName)
      return if (fontsId != 0) fontsId else null
    }
}
