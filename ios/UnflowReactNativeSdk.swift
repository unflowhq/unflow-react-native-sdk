@objc(UnflowReactNativeSdk)
class UnflowReactNativeSdk: NSObject {

    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }

    @objc(initialize:withEnableLogging:)
    func initialize(apiKey: String, enableLogging: Bool) -> Void {
        NSLog("UNFLOW - INITIALIZING")
    }

    @objc(sync)
    func sync() -> Void {
        NSLog("UNFLOW - SYNCING")
    }
}
