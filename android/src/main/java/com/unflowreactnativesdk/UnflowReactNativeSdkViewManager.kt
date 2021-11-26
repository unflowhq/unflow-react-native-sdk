package com.unflowreactnativesdk

import android.content.Context
import android.graphics.Color
import android.util.AttributeSet
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.view.ViewGroup.LayoutParams.MATCH_PARENT
import android.view.ViewGroup.LayoutParams.WRAP_CONTENT
import android.widget.FrameLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.uimanager.LayoutShadowNode
import com.facebook.react.uimanager.PixelUtil
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

//  override fun measure(
//    context: Context,
//    localData: ReadableMap?,
//    props: ReadableMap?,
//    state: ReadableMap?,
//    width: Float,
//    widthMode: YogaMeasureMode?,
//    height: Float,
//    heightMode: YogaMeasureMode?,
//    attachmentsPositions: FloatArray?
//  ): Long {
//    Log.d("UNFLOWRN", "Does it get here?")
//
//    val view = ReactNativeOpenerView(context)
//
//    val measureSpec = View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED)
//    view.measure(measureSpec, measureSpec)
//
//    return YogaMeasureOutput.make(
//      PixelUtil.toDIPFromPixel(view.measuredWidth.toFloat()),
//      PixelUtil.toDIPFromPixel(view.measuredHeight.toFloat())
//    )
//  }

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

//class ReactNativeOpenerView(
//  context: Context,
//  attrs: AttributeSet? = null
//) : FrameLayout(context, attrs) {
//
//  init {
//    addView(TextView(context).apply {
//      setText("ELLO")
//    })
////    addView(View(context).apply {
////      layoutParams = LayoutParams(MATCH_PARENT, 400)
////      setBackgroundColor(Color.CYAN)
////    })
////    addView(TextView(context).apply {
////      text = "ELLO"
////      layoutParams = LayoutParams(MATCH_PARENT, WRAP_CONTENT)
////    })
//
//    val openerView = OpenerView(context).apply {
//      layoutParams = LayoutParams(MATCH_PARENT, WRAP_CONTENT)
//    }
//    addView(openerView)
//
//    layoutParams = LayoutParams(MATCH_PARENT, WRAP_CONTENT)
//    setBackgroundColor(Color.CYAN)
//
//    addOnAttachStateChangeListener(object : OnAttachStateChangeListener {
//      override fun onViewAttachedToWindow(v: View?) {
//        Log.d("UNFLOWRN", "Add view")
////        val openerView = OpenerView(context).apply {
////          layoutParams = LayoutParams(MATCH_PARENT, WRAP_CONTENT)
////        }
////        addView(openerView)
////        requestLayout()
////        post {
////          openerView.measure(0, 0)
//        Log.d("UNFLOWRN", "Opener W: ${openerView.measuredWidth}")
//        Log.d("UNFLOWRN", "Opener H: ${openerView.measuredHeight}")
////        }
////        requestLayout()
//      }
//
//      override fun onViewDetachedFromWindow(v: View?) {
//        removeOnAttachStateChangeListener(this)
//      }
//    })
////      invalidate()
////      addView(OpenerView(context)).apply {
////        layoutParams = LayoutParams(MATCH_PARENT, 500)
////      }
////    }
//  }
//
//  override fun requestLayout() {
//    super.requestLayout()
//    post(mLayoutRunnable)
//  }
//
//  private val mLayoutRunnable = Runnable {
//    measure(
//      MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
//      MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY)
//    )
//    layout(left, top, right, bottom)
//  }
//}

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
