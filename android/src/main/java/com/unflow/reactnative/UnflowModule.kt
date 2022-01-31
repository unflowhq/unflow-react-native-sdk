package com.unflow.reactnative

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.unflow.androidsdk.UnflowSdk
import com.unflow.androidsdk.ui.theme.Fonts

class UnflowModule(
  private val reactContext: ReactApplicationContext,
) : ReactContextBaseJavaModule(reactContext) {

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
      UnflowSdk.initialize(
        application = application,
        config = UnflowSdk.Config(apiKey, enableLogging),
        analyticsListener = null,
        activityProvider = CurrentActivityProvider { currentActivity }
      )
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

    private fun ReadableMap.getFontResId(key: String): Int? {
      if (!hasKey(key)) return null
      return reactContext.resources.getIdentifier(getString(key), "font", reactContext.packageName)
    }
}
