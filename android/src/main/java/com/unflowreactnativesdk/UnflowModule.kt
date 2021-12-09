package com.unflowreactnativesdk

import com.facebook.react.bridge.*
import com.unflow.androidsdk.UnflowSdk

class UnflowModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "Unflow"
    }

    @ReactMethod
    fun initialize(apiKey: String, enableLogging: Boolean) {
      UnflowSdk.initialize(
        context = reactApplicationContext,
        config = UnflowSdk.Config(apiKey, enableLogging),
        analyticsListener = null
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

    @ReactMethod
    fun setAttributes(attributes: ReadableMap) {
      val mappedAttributes = attributes as Map<String, String>
      UnflowSdk.client().setAttributes(attributes = mappedAttributes)
    }

    @ReactMethod
    fun setCustomFonts(fonts: ReadableMap) {
//      TODO("Pull font family from assets")
//      UnflowSdk.client().setCustomFonts(fonts = Fonts(
//
//      ))
    }
}
