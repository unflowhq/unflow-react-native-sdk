package com.unflow.reactnative

import android.app.Application
import com.facebook.react.bridge.*
import com.unflow.androidsdk.UnflowSdk
import com.unflow.androidsdk.ui.theme.Fonts
import kotlin.reflect.KClass
import kotlin.reflect.cast

class UnflowModule(
  private val reactContext: ReactApplicationContext,
  private val application: Application,
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "Unflow"
    }

    @ReactMethod
    fun initialize(apiKey: String, enableLogging: Boolean) {
      UnflowSdk.initialize(
        application = application,
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

    @Suppress("UNCHECKED_CAST")
    @ReactMethod
    fun setAttributes(attributes: ReadableMap) {
      val attributesMap = attributes.toHashMap() as? Map<String, Any>
      val stringAttributes = attributesMap?.filterMapValueType(String::class)
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
    fun openScreen(screenId: Double) {
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

private inline fun <K, V, reified T : Any> Map<K, V>.filterMapValueType(type: KClass<T>): Map<K, T> {
  return filterValues { type.isInstance(it) }.mapValues { type.cast(it) }
}
