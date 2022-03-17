import Unflow
import UnflowUI
import SwiftUI
import Combine

class UnflowAnalyticsListener: UnflowUI.AnalyticsListener {
    func onEvent(event: UnflowUI.UnflowEvent) {
        print("\(event.name) metadata: \(event.metadata)")
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
@available(iOS 13.0, *)
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
        UnflowSDK.client.sync()
    }

    @objc(setUserId:)
    func setUserId(userId: String) -> Void {
        UnflowSDK.client.setUserId(userId: userId)
    }

    @objc(setAttributes:)
    func setAttributes(attributes: NSDictionary) -> Void {
        guard let mappedAttribtues = attributes as? [String: String] else {
            return
        }
        UnflowSDK.client.setAttributes(attributes: mappedAttribtues)
    }

    @objc(setCustomFonts:)
    func setCustomFonts(fonts: NSDictionary) -> Void {
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
    
    @objc(openScreen:)
    func openScreen(screenId: Double) -> Void {
        do {
            try UnflowSDK.client.openScreen(withID: Int(screenId))
        } catch {}
    }
    
    @objc(trackEvent:withMetadata:)
    func trackEvent(eventName: String, metadata: NSDictionary) -> Void {
        do {
            let attributes = try EventMetadata(from: metadata)
            UnflowSDK.client.trackEvent(eventName, attributes: attributes)
        } catch {}
    }
    
    @objc(subscribe:)
    func subscribe(subscriptionId: String) -> Void {
        let publisher = UnflowSDK.client.openers(id: subscriptionId)
            .sink { openers in
                let mappedOpeners = openers.map {
                    [
                        "id": $0.id,
                        "title": $0.title,
                        "priority": $0.priority,
                        "subtitle": $0.subtitle,
                        "imageURL": $0.imageURL,
                    ]
                }
                EventEmitter.sharedInstance.dispatch(
                    name: "OpenersChanged",
                    body: [subscriptionId: mappedOpeners ]
                )
            }
        EventEmitter.sharedInstance.store(publisher: publisher)
    }

    @objc static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    @objc func methodQueue() -> DispatchQueue {
        return DispatchQueue.main
    }
}
