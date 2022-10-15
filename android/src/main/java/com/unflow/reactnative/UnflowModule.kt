package com.unflow.reactnative

import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.unflow.analytics.AnalyticsListener
import com.unflow.analytics.domain.model.UnflowEvent
import com.unflow.androidsdk.UnflowSdk
import com.unflow.androidsdk.ui.theme.Fonts
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.collectLatest

class UnflowModule(
  private val reactContext: ReactApplicationContext,
  private val scope: CoroutineScope = CoroutineScope(SupervisorJob() + Dispatchers.Default)
) : ReactContextBaseJavaModule(reactContext) {

  private var openerJobs: MutableSet<Job> = mutableSetOf()
  private var listener: AnalyticsListener = UnflowAnalyticsListener(reactContext)

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
          analyticsListener = listener,
          activityProvider = CurrentActivityProvider { currentActivity }
        )
      }
    }

    @ReactMethod
    fun sync() {
      UnflowSdk.client().sync()
    }

    @ReactMethod
    fun close() {
      UnflowSdk.client().close()
    }

    @ReactMethod
    fun pause() {
      UnflowSdk.client().pause()
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
    fun openers(spaceKey: String) {
      val job = scope.launch {
        UnflowSdk.client().openers(spaceKey = spaceKey).collectLatest {
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
          arguments.putArray(spaceKey, openerList)

          reactContext
            .getJSModule(RCTDeviceEventEmitter::class.java)
            .emit("OpenersChanged", arguments)
        }
      }
      openerJobs.add(job)
    }

    @ReactMethod
    fun spaces() {
      val job = scope.launch {
        UnflowSdk.client().spaces().collectLatest {
          val spaceList = Arguments.createArray()

          it.forEach {
            val map = WritableNativeMap()
            map.putString("spaceKey", it.key)
            map.putString("name", it.name)

            val openers = WritableNativeArray()
            it.openers.forEach {
              val opener = WritableNativeMap()
              opener.putInt("id", it.screenId.toInt())
              opener.putString("title", it.title)
              opener.putInt("priority", it.priority)
              opener.putString("subtitle", it.subtitle)
              opener.putString("imageURL", it.imageUrl)
              openers.pushMap(opener)
            }
            map.putArray("openers", openers)
            spaceList.pushMap(map)
          }

          reactContext
            .getJSModule(RCTDeviceEventEmitter::class.java)
            .emit("SpacesChanged", spaceList)
        }
      }
      openerJobs.add(job)
    }

    @ReactMethod
    fun setPushToken(token: String) {
      UnflowSdk.client().registerPushToken(token = token)
    }

    private fun ReadableMap.getFontResId(key: String): Int? {
      if (!hasKey(key)) return null

      val fontFamily: String?;
      when (getType(key)) {
        ReadableType.String -> {
          fontFamily = getString(key)
        }
        ReadableType.Map -> {
          fontFamily = getMap(key)?.getString("family")
        }
        else -> { return null }
      }

      val fontId = reactContext.resources.getIdentifier(fontFamily, "font", reactContext.packageName)
      if (fontId != 0) return fontId

      val fontsId = reactContext.resources.getIdentifier(fontFamily, "fonts", reactContext.packageName)
      return if (fontsId != 0) fontsId else null
    }
}

private class UnflowAnalyticsListener(
  private val reactContext: ReactApplicationContext,
  ): AnalyticsListener {
  override fun onEvent(event: UnflowEvent) {
    emitEvent(event)
  }

  @ReactMethod
  fun emitEvent(event: UnflowEvent) {
    val eventMap = WritableNativeMap()

    eventMap.putString("id", event.id)
    eventMap.putString("name", event.name)
    event.occurredAt?.let { eventMap.putDouble("occurredAt", it.toDouble()) }

    val metadataMap = WritableNativeMap()
    event.metadata.forEach {
      when(it.value) {
        is Long -> {  metadataMap.putDouble(it.key, ((it.value as? Long) ?: 0).toDouble())  }
        is Int -> {  metadataMap.putInt(it.key, ((it.value as? Int) ?: 0)) }
        is String -> {  metadataMap.putString(it.key, (it.value as? String))  }
        is Boolean -> {  metadataMap.putBoolean(it.key, (it.value as? Boolean) ?: false)  }
        null -> {  metadataMap.putNull(it.key) }
        is List<*> -> {  metadataMap.putArray(it.key, makeNativeArray(it.value)) }
      }
    }
    eventMap.putMap("metadata", metadataMap)

    reactContext
      .getJSModule(RCTDeviceEventEmitter::class.java)
      .emit("EventReceived", eventMap)
  }

  private fun makeNativeArray(value: Any?): WritableNativeArray {
    val array = WritableNativeArray()
    (value as? List<*>)?.forEach { arrayValue ->
      when(arrayValue) {
        is Long -> {
          array.pushDouble(((arrayValue as? Long) ?: 0).toDouble())
        }
        is Int -> {
          array.pushInt(((arrayValue as? Int) ?: 0))
        }
        is String -> {
          array.pushString((arrayValue as? String))
        }
        is Boolean -> {
          array.pushBoolean(arrayValue as? Boolean ?: false)
        }
        null -> {
          array.pushNull()
        }
      }
    }
    return array
  }
}
