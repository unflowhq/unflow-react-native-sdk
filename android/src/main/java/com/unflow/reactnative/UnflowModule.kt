package com.unflow.reactnative

import com.facebook.react.bridge.*
import com.unflow.androidsdk.UnflowSdk
import com.unflow.androidsdk.ui.theme.Fonts

class UnflowModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "Unflow"
    }

    @ReactMethod
    fun initialize(apiKey: String, enableLogging: Boolean) {
//      val application = currentActivity!!.application
//      UnflowSdk.initialize(
//        application = application,
//        config = UnflowSdk.Config(apiKey, enableLogging),
//        analyticsListener = null
//      )
    }

    @ReactMethod
    fun sync() {
      UnflowSdk.client().sync()
    }

    @ReactMethod
    fun setUserId(userId: String) {
      UnflowSdk.client().setUserId(userId = userId)
    }

    @ReactMethod
    fun setAttributes(attributes: ReadableMap) {
      val mappedAttributes = attributes.toHashMap() as? Map<String, String>
      if (mappedAttributes != null) {
        UnflowSdk.client().setAttributes(attributes = mappedAttributes)
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

    private fun ReadableMap.getFontResId(key: String): Int? {
      if (!hasKey(key)) return null
      return reactContext.resources.getIdentifier(getString(key), "font", reactContext.packageName)
    }
}
