import Unflow
import UnflowUI
import SwiftUI

class UnflowAnalyticsListener: UnflowUI.AnalyticsListener {
    func onEvent(event: UnflowUI.UnflowEvent) {
        print("\(event.name) attributes: \(event.attributes)")
    }
}

class EventMetadata: Codable {}

fileprivate extension Decodable {
  init(from: Any) throws {
    let data = try JSONSerialization.data(withJSONObject: from, options: .prettyPrinted)
    let decoder = JSONDecoder()
    self = try decoder.decode(Self.self, from: data)
  }
}

@objc(Unflow)
class Unflow: NSObject {

    @objc(initialize:withEnableLogging:)
    func initialize(apiKey: String, enableLogging: Bool) -> Void {
        if #available(iOS 13.0, *) {
            UnflowSDK.initialize(
                config: UnflowSDK.Config(apiKey: apiKey, enableLogging: enableLogging),
                analyticsListener: UnflowAnalyticsListener()
            )
        }
    }

    @objc(sync)
    func sync() -> Void {
        if #available(iOS 13.0, *) {
            UnflowSDK.client.sync()
        }
    }

    @objc(setUserId:)
    func setUserId(userId: String) -> Void {
        if #available(iOS 13.0, *) {
            UnflowSDK.client.setUserId(userId: userId)
        }
    }

    @objc(setAttributes:)
    func setAttributes(attributes: NSDictionary) -> Void {
        if #available(iOS 13.0, *) {
            guard let mappedAttribtues = attributes as? [String: String] else {
                return
            }
            UnflowSDK.client.setAttributes(attributes: mappedAttribtues)
        }
    }

    @objc(setCustomFonts:)
    func setCustomFonts(fonts: NSDictionary) -> Void {
        if #available(iOS 13.0, *) {
            UnflowSDK.client.setCustomFonts(
                fonts: .init(
                    title: (fonts["title"] != nil) ? .custom(fonts["title"] as! String, size: 24) : nil,
                    body: (fonts["body"] != nil) ? .custom(fonts["body"] as! String, size: 16) : nil,
                    button: (fonts["button"] != nil) ? .custom(fonts["button"] as! String, size: 16) : nil,
                    openerTitle: (fonts["openerTitle"] != nil) ? .custom(fonts["openerTitle"] as! String, size: 14) : nil,
                    openerSubtitle: (fonts["openerSubtitle"] != nil) ? .custom(fonts["openerSubtitle"] as! String, size: 12) : nil
                )
            )
        }
    }
    
    @objc(openScreen:)
    func openScreen(screenId: Double) -> Void {
        if #available(iOS 13.0, *) {
            do {
                try UnflowSDK.client.openScreen(withID: Int(screenId))
            } catch {}
        }
    }
    
    @objc(trackEvent:withMetadata:)
    func trackEvent(eventName: String, metadata: NSDictionary) -> Void {
        if #available(iOS 13.0, *) {
            do {
                let attributes = try EventMetadata(from: metadata)
                UnflowSDK.client.trackEvent(eventName, attributes: attributes)
            } catch {}
        }
    }

    @objc static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    @objc func methodQueue() -> DispatchQueue {
        return DispatchQueue.main
    }
}
