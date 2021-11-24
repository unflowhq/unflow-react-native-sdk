package com.unflowreactnativesdk

import android.content.Context
import android.util.AttributeSet
import android.util.Log
import android.view.View
import android.widget.FrameLayout
import android.widget.TextView
import androidx.appcompat.widget.SwitchCompat
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.LayoutShadowNode
import com.facebook.react.uimanager.PixelUtil
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.yoga.YogaMeasureFunction
import com.facebook.yoga.YogaMeasureMode
import com.facebook.yoga.YogaMeasureOutput
import com.facebook.yoga.YogaNode
import com.unflow.androidsdk.ui.opener.OpenerView


class UnflowReactNativeSdkViewManager : SimpleViewManager<ReactNativeOpenerView>() {
  override fun getName() = "UnflowReactNativeSdkView"

  override fun createViewInstance(context: ThemedReactContext): ReactNativeOpenerView {
    return ReactNativeOpenerView(context)
  }

  override fun createShadowNodeInstance(): LayoutShadowNode {
    return OpenerViewShadowNode()
  }

  override fun getShadowNodeClass(): Class<LayoutShadowNode> {
    return OpenerViewShadowNode::class.java as Class<LayoutShadowNode>
  }

  override fun measure(
    context: Context,
    localData: ReadableMap?,
    props: ReadableMap?,
    state: ReadableMap?,
    width: Float,
    widthMode: YogaMeasureMode?,
    height: Float,
    heightMode: YogaMeasureMode?,
    attachmentsPositions: FloatArray?
  ): Long {
    Log.d("UNFLOW", "Does it get here?")

    val view = ReactNativeOpenerView(context)

    val measureSpec = View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED)
    view.measure(measureSpec, measureSpec)

    return YogaMeasureOutput.make(
      PixelUtil.toDIPFromPixel(view.getMeasuredWidth().toFloat()),
      PixelUtil.toDIPFromPixel(view.getMeasuredHeight().toFloat())
    )
  }

  class OpenerViewShadowNode : LayoutShadowNode(),
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
          Log.d("UNFLOW", "Does it get here first?")

          val reactSwitch = ReactNativeOpenerView(themedContext)

          val spec = View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED)
          reactSwitch.measure(spec, spec)
          mWidth = reactSwitch.getMeasuredWidth()
          mHeight = reactSwitch.getMeasuredHeight()
          mMeasured = true
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
) : FrameLayout(context, attrs) {

  init {
      addView(TextView(context).apply {
        text = "hello  world!"
      })

//    addView(OpenerView(context))
  }

  override fun requestLayout() {
    Log.d("UNFLOW", "Measure Switch")
    super.requestLayout()
    post(mLayoutRunnable)
  }

  private val mLayoutRunnable = Runnable {
    Log.d("UNFLOW", isAttachedToWindow.toString())
      measure(
        MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
        MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY)
      )
      layout(left, top, right, bottom)
  }
}

//class ReactNativeOpenerView(
//  context: Context,
//  attrs: AttributeSet? = null
//) : OpenerView(context, attrs) {
//
//  override fun requestLayout() {
//    super.requestLayout()
//    post(measureAndLayout)
//  }
//
//  private val measureAndLayout = Runnable {
//    measure(MeasureSpec.UNSPECIFIED, MeasureSpec.UNSPECIFIED)
//    Log.d("UNFLOW LEFT", left.toString())
//    Log.d("UNFLOW TOP", top.toString())
//    Log.d("UNFLOW RIGHT", right.toString())
//    Log.d("UNFLOW BOTTOM", bottom.toString())
//    layout(left, top, right, bottom)
//    Log.d("UNFLOW WIDTH", width.toString())
//    Log.d("UNFLOW HEIGHT", height.toString())
//  }
//}
