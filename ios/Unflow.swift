import Unflow
import UnflowUI

class UnflowAnalyticsListener: AnalyticsListener {
    func onEvent(event: UnflowEvent) {
        print("\(event.name) attributes: \(event.attributes)")
    }
}

@objc(Unflow)
class Unflow: NSObject {

    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }

    @objc(initialize:withEnableLogging:)
    func initialize(apiKey: String, enableLogging: Bool) -> Void {
        DispatchQueue.main.async {
            UnflowSDK.initialize(
                config: UnflowSDK.Config(apiKey: apiKey, enableLogging: enableLogging),
                analyticsListener: UnflowAnalyticsListener()
            )
        }
    }

    @objc(sync)
    func sync() -> Void {
        DispatchQueue.main.async {
            UnflowSDK.client.sync()
        }
    }
}
