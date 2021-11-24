package com.unflowreactnativesdk

import android.util.Log
import com.facebook.react.uimanager.LayoutShadowNode
import com.facebook.react.uimanager.ViewProps

import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.yoga.*
import com.unflow.androidsdk.ui.opener.OpenerView


//class OpenerViewShadowNode : LayoutShadowNode(), YogaMeasureFunction {
//  override fun measure(
//    node: YogaNode,
//    width: Float, widthMode: YogaMeasureMode,
//    height: Float, heightMode: YogaMeasureMode
//  ): Long {
//
//    if (!mMeasured) {
//      // Create a switch with the default config and measure it; since we don't (currently)
//      // support setting custom switch text, this is fine, as all switches will measure the same
//      // on a specific device/theme/locale combination.
//      ReactSwitch reactSwitch = new ReactSwitch(getThemedContext());
//      reactSwitch.setShowText(false);
//      final int spec = View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED);
//      reactSwitch.measure(spec, spec);
//      mWidth = reactSwitch.getMeasuredWidth();
//      mHeight = reactSwitch.getMeasuredHeight();
//      mMeasured = true;
//    }
//
//    return YogaMeasureOutput.make(mWidth, mHeight);
//  }
//}
//
//  init {
//    setMeasureFunction(this)
//  }
//}
