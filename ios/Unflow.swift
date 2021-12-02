import Unflow
import UnflowUI

class UnflowAnalyticsListener: AnalyticsListener {
    func onEvent(event: UnflowEvent) {
        print("\(event.name) attributes: \(event.attributes)")
    }
}

@objc(Unflow)
class Unflow: NSObject {

    @objc(initialize:withEnableLogging:)
    func initialize(apiKey: String, enableLogging: Bool) -> Void {
        UnflowSDK.initialize(
            config: UnflowSDK.Config(apiKey: apiKey, enableLogging: enableLogging),
            analyticsListener: UnflowAnalyticsListener()
        )
    }

    @objc(sync)
    func sync() -> Void {
        if #available(iOS 13.0, *) {
            UnflowSDK.client.sync()
        }
    }
    
    @objc static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    @objc func methodQueue() -> DispatchQueue {
        return DispatchQueue.main
    }
}
