package com.unflow.reactnative

import android.content.Context
import android.content.res.Resources
import android.util.AttributeSet
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.AbstractComposeView
import com.facebook.react.bridge.*
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.unflow.androidsdk.ui.opener.OpenerView
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.facebook.react.common.MapBuilder
import com.unflow.androidsdk.ui.opener.Opener
import kotlin.math.roundToInt

class UnflowOpenerViewManager : SimpleViewManager<ReactNativeOpenerView>() {

  override fun getName() = "UnflowOpenerView"

  override fun createViewInstance(context: ThemedReactContext): ReactNativeOpenerView {
    return ReactNativeOpenerView(context)
  }

  override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any>? {
    return MapBuilder.builder<String, Any>()
      .put(
        "onHeightSet",
        MapBuilder.of("registrationName", "onHeightSet")
      )
      .build()
  }
}

class ReactNativeOpenerView(
  context: Context,
  attrs: AttributeSet? = null
) : OpenerView(context, attrs) {

  override fun requestLayout() {
    super.requestLayout()
    post(mLayoutRunnable)
  }

  private val mLayoutRunnable = Runnable {
    measure(
      MeasureSpec.makeMeasureSpec(width, MeasureSpec.AT_MOST),
      MeasureSpec.makeMeasureSpec(height, MeasureSpec.UNSPECIFIED)
    )

    layout(left, top, right, bottom)

    val event: WritableMap = Arguments.createMap()
    event.putInt("height", measuredHeight.px)
    var reactContext = context as ReactContext
    reactContext.getJSModule(RCTEventEmitter::class.java).receiveEvent(
      id,
      "onHeightSet",
      event
    )
  }
}

val Int.px: Int
  get() {
    val density = Resources.getSystem().displayMetrics.density
    return (this / density).roundToInt()
  }
