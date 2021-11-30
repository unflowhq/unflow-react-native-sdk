package com.unflowreactnativesdk

import com.facebook.react.bridge.*
import com.unflow.androidsdk.UnflowSdk

class UnflowModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "Unflow"
    }

    // Example method
    // See https://reactnative.dev/docs/native-modules-android
    @ReactMethod
    fun multiply(a: Int, b: Int, promise: Promise) {
      promise.resolve(a * b)
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
      TODO("Pull font family from assets")
//      UnflowSdk.client().setCustomFonts(fonts = Fonts(
//
//      ))
    }
}
