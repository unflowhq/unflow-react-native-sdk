import UnflowUI

@objc(UnflowReactNativeSdkViewManager)
class UnflowReactNativeSdkViewManager: RCTViewManager {
    
    override func view() -> UIView! {
        return URNOpenerView()
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}

@objc(URNOpenerView)
class URNOpenerView : UIView {
    
    weak var openerViewController: OpenerViewController?

    override init(frame: CGRect) {
        super.init(frame: frame)
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        
        if openerViewController == nil {
            embed()
        } else {
            openerViewController?.view.frame = bounds
        }
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func embed() {
        guard let parentVC = parentViewController else {
            return
        }

        let openerViewController = OpenerViewController()
        parentVC.addChild(openerViewController)
        addSubview(openerViewController.view)
        openerViewController.view.frame = bounds
        openerViewController.didMove(toParent: parentVC)
        self.openerViewController = openerViewController
    }
}

extension UIView {
    var parentViewController: UIViewController? {
        var parentResponder: UIResponder? = self
        while parentResponder != nil {
            parentResponder = parentResponder!.next
            if let viewController = parentResponder as? UIViewController {
                return viewController
            }
        }
        return nil
    }
}
