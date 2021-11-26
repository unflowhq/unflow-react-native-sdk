package com.unflowreactnativesdk

import android.content.Context
import android.graphics.Color
import android.util.AttributeSet
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.view.ViewGroup.LayoutParams.WRAP_CONTENT
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.uimanager.LayoutShadowNode
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.yoga.YogaMeasureFunction
import com.facebook.yoga.YogaMeasureMode
import com.facebook.yoga.YogaMeasureOutput
import com.facebook.yoga.YogaNode
import com.unflow.androidsdk.ui.opener.OpenerView

class UnflowReactNativeSdkViewManager(
  private val reactContext: ReactApplicationContext
) : SimpleViewManager<ReactNativeOpenerView>() {

  override fun getName() = "UnflowReactNativeSdkView"

  override fun createViewInstance(context: ThemedReactContext): ReactNativeOpenerView {
    return ReactNativeOpenerView(context)
  }

  override fun createShadowNodeInstance(): LayoutShadowNode {
    return OpenerViewShadowNode(reactContext)
  }

  @Suppress("UNCHECKED_CAST")
  override fun getShadowNodeClass(): Class<LayoutShadowNode> {
    return OpenerViewShadowNode::class.java as Class<LayoutShadowNode>
  }

  class OpenerViewShadowNode(
    private val reactContext: ReactApplicationContext
  ) : LayoutShadowNode(),
    YogaMeasureFunction {
    private var mWidth = 0
    private var mHeight = 0
    private var mMeasured = false

    override fun measure(
      node: YogaNode,
      width: Float,
      widthMode: YogaMeasureMode,
      height: Float,
      heightMode: YogaMeasureMode
    ): Long {
      if (!mMeasured) {
        UiThreadUtil.runOnUiThread {
          val contentView =
            (reactContext.currentActivity as AppCompatActivity).findViewById<ViewGroup>(android.R.id.content)
          val reactSwitch = ReactNativeOpenerView(themedContext)
            .apply {
              layoutParams = ViewGroup.LayoutParams(WRAP_CONTENT, WRAP_CONTENT)
//              visibility = View.INVISIBLE
              setBackgroundColor(Color.RED)
            }
          contentView.addView(reactSwitch)
          val spec = View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED)
          reactSwitch.measure(spec, spec)
          mWidth = reactSwitch.measuredWidth
          mHeight = reactSwitch.measuredHeight
          mMeasured = true
          Log.d("UNFLOWRN", "W: $mWidth")
          Log.d("UNFLOWRN", "H: $mHeight")
//          contentView.removeView(reactSwitch)
        }
      }

      return YogaMeasureOutput.make(mWidth, mHeight)
    }

    init {
      setMeasureFunction(this)
    }
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
      MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
      MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY)
    )
    layout(left, top, right, bottom)
  }
}
