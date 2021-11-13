//
//  UnflowReactNativeSdkViewManager.swift
//  unflow-react-native-sdk
//
//  Created by David Newell on 11/13/21.
//

@objc(UnflowReactNativeSdkViewManager)
class UnflowReactNativeSdkViewManager: RCTViewManager {
    override func view() -> UIView! {
        let label = UILabel()
        label.text = "Swift Counter"
        label.textAlignment = .center
        return label
    }

    override static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
