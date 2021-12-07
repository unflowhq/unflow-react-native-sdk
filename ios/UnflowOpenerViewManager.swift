import UIKit
import SwiftUI
import UnflowUI

@objc(UnflowOpenerViewManager)
class UnflowOpenerViewManager: RCTViewManager {

    override func view() -> UIView! {
        var view = UIView()

        if #available(iOS 13.0, *) {
            view = ReactNativeOpenerView()
            view.layer.masksToBounds = true
        }

        return view
    }

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}

@available(iOS 13.0, *)
@objc(ReactNativeOpenerView)
class ReactNativeOpenerView : UIView {

    @objc var onHeightSet: RCTDirectEventBlock?

    weak var openerViewController: SelfSizingHostingController<OpenerView>?

    override init(frame: CGRect) {
        super.init(frame: frame)
    }

    override func layoutSubviews() {
        super.layoutSubviews()

        if openerViewController == nil {
            embed()
        }
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    private func embed() {
        guard let parentVC = parentViewController else {
            return
        }

        let openerViewController = SelfSizingHostingController(rootView: OpenerView())
        openerViewController.sizeDidChange = { [weak self] size in
            self?.onHeightSet?(["height": size.height])
        }
        parentVC.addChild(openerViewController)
        addSubview(openerViewController.view)
        openerViewController.view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        openerViewController.view.frame = bounds
        openerViewController.didMove(toParent: parentVC)
        self.openerViewController = openerViewController
    }
}

@available(iOS 13.0, *)
final class SelfSizingHostingController<Content: View>: UIHostingController<Content> {

    var sizeDidChange: ((CGSize) -> Void)?

    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        view.invalidateIntrinsicContentSize()
        sizeDidChange?(view.intrinsicContentSize)
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
