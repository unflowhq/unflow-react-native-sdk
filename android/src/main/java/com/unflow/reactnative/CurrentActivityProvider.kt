package com.unflow.reactnative

import android.app.Activity
import com.unflow.androidsdk.ui.activity.ActivityProvider

internal class CurrentActivityProvider(
    private val getCurrentActivity: () -> Activity?
) : ActivityProvider {

    override fun getActivity(): Activity? {
        return getCurrentActivity()
    }
}
