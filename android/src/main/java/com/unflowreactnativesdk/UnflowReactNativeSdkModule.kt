package com.unflowreactnativesdk

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.unflow.androidsdk.UnflowSdk

class UnflowReactNativeSdkModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "UnflowReactNativeSdk"
    }

    // Example method
    // See https://reactnative.dev/docs/native-modules-android
    @ReactMethod
    fun multiply(a: Int, b: Int, promise: Promise) {

      promise.resolve(a * b)

    }

    @ReactMethod
    fun initialize(apiKey: String, enableLogging: Boolean) {
      Log.d("Unflow", "INITIALIZING")
      UnflowSdk.initialize(
        context = reactApplicationContext,
        config = UnflowSdk.Config(apiKey, enableLogging),
        analyticsListener = null
      )
      Log.d("Unflow", "DONE INITIALIZING")
    }

    @ReactMethod
    fun sync() {
      Log.d("Unflow", "SYNCING")
      UnflowSdk.client().sync()
      Log.d("Unflow", "DONE SYNCING")
    }


}
