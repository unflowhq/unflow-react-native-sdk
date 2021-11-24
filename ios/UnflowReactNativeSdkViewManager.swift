import UnflowUI

@objc(UnflowReactNativeSdkViewManager)
class UnflowReactNativeSdkViewManager: RCTViewManager {
    override func view() -> UIView! {
        let label = UILabel()
        label.text = "Swift Counter"
        label.textAlignment = .center
        return label
//        let view = UIView()
//        let unflowViewController = OpenerViewController()
//        view.addSubview(unflowViewController.view)
//        return view
    }

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
