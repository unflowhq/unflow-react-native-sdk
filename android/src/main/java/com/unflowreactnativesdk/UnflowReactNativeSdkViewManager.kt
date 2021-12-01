package com.unflowreactnativesdk

import android.content.Context
import android.graphics.Color
import android.util.AttributeSet
import android.util.Log
import com.facebook.react.uimanager.LayoutShadowNode
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.yoga.YogaMeasureFunction
import com.facebook.yoga.YogaMeasureMode
import com.facebook.yoga.YogaMeasureOutput
import com.facebook.yoga.YogaNode
import com.unflow.androidsdk.ui.opener.OpenerView

private var onDirty: ((Int) -> Unit)? = null

class UnflowReactNativeSdkViewManager : SimpleViewManager<ReactNativeOpenerView>() {

  override fun getName() = "UnflowReactNativeSdkView"

  override fun createViewInstance(context: ThemedReactContext): ReactNativeOpenerView {
    return ReactNativeOpenerView(context)
  }

  override fun createShadowNodeInstance(): LayoutShadowNode {
    return OpenerViewShadowNode()
  }

  @Suppress("UNCHECKED_CAST")
  override fun getShadowNodeClass(): Class<LayoutShadowNode> {
    return OpenerViewShadowNode::class.java as Class<LayoutShadowNode>
  }

  class OpenerViewShadowNode : LayoutShadowNode(), YogaMeasureFunction {
    private var mWidth = 0
    private var mHeight = 0

    override fun measure(
      node: YogaNode,
      width: Float,
      widthMode: YogaMeasureMode,
      height: Float,
      heightMode: YogaMeasureMode
    ): Long {
      Log.d("UNFLOWRN", "YW: $width")
      Log.d("UNFLOWRN", "YH: $height")

      onDirty = {
        Log.d("UNFLOWRN", "ON DIRTY. H: $it")
        mHeight = it
        dirty()
      }

      Log.d("UNFLOWRN", "SW: $mWidth")
      Log.d("UNFLOWRN", "SH: $mHeight")
      return YogaMeasureOutput.make(width.toInt(), mHeight)
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

  init {
    setBackgroundColor(Color.CYAN)
    onOpeners = {
      Log.d("UNFLOWRN", "VOpeners: $it")
      Log.d("UNFLOWRN", "OH: $measuredHeight")
    }
  }

  override fun requestLayout() {
    super.requestLayout()
    post(mLayoutRunnable)
  }

  private val mLayoutRunnable = Runnable {
    measure(
      MeasureSpec.makeMeasureSpec(width, MeasureSpec.AT_MOST),
      MeasureSpec.makeMeasureSpec(height, MeasureSpec.UNSPECIFIED)
    )
    Log.d("UNFLOWRN", "VW: $measuredWidth")
    Log.d("UNFLOWRN", "VH: $measuredHeight")
    layout(left, top, right, bottom)
    Log.d("UNFLOWRN", "VL: $left")
    Log.d("UNFLOWRN", "VT: $top")
    Log.d("UNFLOWRN", "VB: $bottom")
    Log.d("UNFLOWRN", "VR: $right")
    onDirty?.invoke(measuredHeight)
  }
}
