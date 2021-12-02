import UnflowUI

@objc(UnflowReactNativeSdkViewManager)
class UnflowReactNativeSdkViewManager: RCTViewManager {
    
    override func view() -> UIView! {
        //        let label = UILabel()
        //        label.text = "Swift Counter"
        //        label.textAlignment = .center
        //        return label
        
        let view = UIView()
        let unflowViewController = OpenerViewController()
        view.addSubview(unflowViewController.view)
        return view
        
//        return URNOpenerView()
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}

//@objc(URNOpenerView)
//class URNOpenerView : UIView {
//    var openerView : UIView? = nil
//
//    override init(frame: CGRect) {
//        super.init(frame: frame)
//
//        let openerViewController = OpenerViewController()
//        guard let openerView = openerViewController.view else { return }
//
//        openerView.frame = self.bounds
//        openerView.autoresizingMask = [.flexibleHeight, .flexibleWidth]
//        addSubview(openerView)
//        self.openerView = openerView
//    }
//
//    override func layoutSubviews() {
//        super.layoutSubviews()
//        self.openerView?.frame = self.bounds
//    }
//
//    required init?(coder aDecoder: NSCoder) {
//        fatalError("init(coder:) has not been implemented")
//    }
//}
