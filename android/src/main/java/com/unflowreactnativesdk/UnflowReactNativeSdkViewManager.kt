package com.unflowreactnativesdk

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.unflow.androidsdk.ui.opener.OpenerView


class UnflowReactNativeSdkViewManager : SimpleViewManager<OpenerView>() {
  override fun getName() = "UnflowReactNativeSdkView"

  override fun createViewInstance(context: ThemedReactContext): OpenerView {
    return OpenerView(context)
  }
}
