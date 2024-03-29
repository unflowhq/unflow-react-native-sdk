import UnflowUI
import SwiftUI
import Combine

class UnflowAnalyticsListener: UnflowUI.AnalyticsListener {
    func onEvent(event: UnflowUI.UnflowEvent) {
        print("UnflowEvent: \(event.name) metadata: \(event.metadata)")
        if #available(iOS 13, *) {
            Task {
                await MainActor.run(body: {
                    EventEmitter.sharedInstance.dispatch(
                        name: EventName.eventReceived.key,
                        body: [
                            "id": event.id,
                            "name": event.name,
                            "metadata": event.metadata,
                            "occurredAt": event.occuredAt
                        ]
                    )
                })
            }
        }
    }

    func onAttributesUpdate(attributes: [String: UnflowUI.UnflowAnalyticsValue]) {
        if #available(iOS 13, *) {
            Task {
                await MainActor.run(body: {
                    EventEmitter.sharedInstance.dispatch(
                        name: EventName.attributesUpdated.key, 
                        body: attributes
                    )
                })
            }
        }
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

    private let listener = UnflowAnalyticsListener()

    @objc(initialize:withEnableLogging:)
    func initialize(apiKey: String, enableLogging: Bool) -> Void {
        if #available(iOS 13.0, *) {
            _ = UnflowSDK.initialize(
                config: UnflowSDK.Config(apiKey: apiKey, enableLogging: enableLogging),
                analyticsListener: listener
            )
        }
    }

    @objc(sync)
    func sync() -> Void {
        if #available(iOS 13.0, *) {
            Task {
                await MainActor.run(body: {
                    UnflowSDK.client.sync()
                })
            }
        }
    }

    @objc(close)
    func close() -> Void {
        if #available(iOS 13.0, *) {
            Task {
                await UnflowSDK.client.close()
            }
        }
    }

    @objc(pause)
    func pause() -> Void {
        if #available(iOS 13.0, *) {
            Task {
                await MainActor.run(body: {
                    UnflowSDK.client.pause()
                })
            }
        }
    }

    @objc(setUserId:)
    func setUserId(userId: String) -> Void {
        if #available(iOS 13.0, *) {
            Task {
                await MainActor.run(body: {
                    UnflowSDK.client.setUserId(userId: userId)
                })
            }
        }
    }

    @objc(setAttributes:)
    func setAttributes(attributes: NSDictionary) -> Void {
        if #available(iOS 13.0, *) {
            do {
                // Simply checks for valid JSON
                
                _ = try EventMetadata(from: attributes)
                let bridgedAttributes = UnflowMetadataBridge.convert(metadata: attributes)
                Task {
                    await MainActor.run(body: {
                        UnflowSDK.client.setAttributes(attributes: bridgedAttributes)
                    })
                }
            } catch {
                print("Unflow: Unable to set attributes")
            }
        }
    }

    @objc(setCustomFonts:)
    func setCustomFonts(fonts: NSDictionary) -> Void {
        if #available(iOS 13.0, *) {
            let title = convertToFont(font: fonts["title"], defaultSize: 24)
            let body = convertToFont(font: fonts["body"], defaultSize: 16)
            let button = convertToFont(font: fonts["button"], defaultSize: 16)
            let openerTitle = convertToFont(font: fonts["openerTitle"], defaultSize: 14)
            let openerSubtitle = convertToFont(font: fonts["openerSubtitle"], defaultSize: 12)
            Task {
                await MainActor.run(body: {
                    UnflowSDK.client.setCustomFonts(
                        fonts: .init(
                            title: title,
                            body: body,
                            button: button,
                            openerTitle: openerTitle,
                            openerSubtitle: openerSubtitle
                        )
                    )
                })
            }
        }
    }
    
    @available(iOS 13.0, *)
    func convertToFont(font: Any?, defaultSize: CGFloat) -> UIFont? {
        if let fontFamily = font as? String {
            return UIFont(name: fontFamily, size: defaultSize)
        } else if let fontDictionary = font as? NSDictionary {
            if let fontString = fontDictionary["family"] as? String, let fontSize = fontDictionary["size"] as? CGFloat {
                return UIFont(name: fontString, size: fontSize)
            }
        }
        return nil
    }

    
    @objc(openScreen:)
    func openScreen(screenId: Double) -> Void {
        if #available(iOS 13.0, *) {
            do {
                Task {
                    try await MainActor.run(body: {
                        try UnflowSDK.client.openScreen(withID: Int(screenId))
                    })
                }
            } catch {}
        }
    }

    @objc(setLocale:withLanguage:)
    func setLocale(locale: String, language: String) {
        if #available(iOS 13, *) {
            guard Locale.availableIdentifiers.contains(locale) else {
                print("Unflow: Locale '\(locale)' not valid")
                return
            }
            let locale = Locale.init(identifier: locale)
            UnflowSDK.client.setUserLocale(locale: locale, language: language)
        }
    }
    
    @objc(trackEvent:withMetadata:)
    func trackEvent(eventName: String, metadata: NSDictionary) -> Void {
        if #available(iOS 13.0, *) {
            do {
                // Simply checks for valid JSON
                _ = try EventMetadata(from: metadata)
                let bridgedAttributes = UnflowMetadataBridge.convert(metadata: metadata)
                UnflowSDK.client.trackEvent(eventName, attributes: bridgedAttributes)
            } catch {
                print("Unflow: Unable to track event")
            }
        }
    }

    @objc(deregisterToken)
    func deregisterToken() -> Void {
        if #available(iOS 13.0, *) {
            Task {
                await MainActor.run(body: {
                    UnflowSDK.client.deregisterToken()
                })
            }
        }
    }

    @objc(clearUserSession)
    func clearUserSession() -> Void {
        if #available(iOS 13.0, *) {
            Task {
                await MainActor.run(body: {
                    UnflowSDK.client.clearUserSession()
                })
            }
        }
    }

    @objc(openers:)
    func openers(spaceKey: String) -> Void {
        if #available(iOS 13.0, *) {
            let publisher = UnflowSDK.client.openers(id: spaceKey)
                .receive(on: RunLoop.main)
                .sink { openers in
                    let mappedOpeners = openers.map {
                        [
                            "id": $0.id,
                            "title": $0.title,
                            "priority": $0.priority,
                            "subtitle": $0.subtitle,
                            "imageURL": $0.imageURL
                        ] as [String : Any?]
                    }
                    EventEmitter.sharedInstance.dispatch(
                        name: EventName.openersChanged.key,
                        body: [spaceKey: mappedOpeners]
                    )
                }
            EventEmitter.sharedInstance.store(publisher: publisher)
        }
    }

    @objc(spaces)
    func spaces() -> Void {
        if #available(iOS 13.0, *) {
            let publisher = UnflowSDK.client.spaces()
                .receive(on: RunLoop.main)
                .sink { spaces in
                    let mappedSpaces = spaces.map {
                        return [
                            "spaceKey": $0.key,
                            "name": $0.name,
                            "openers": $0.openers.compactMap { opener in
                                return [
                                    "id": opener.id,
                                    "title": opener.title,
                                    "priority": opener.priority,
                                    "subtitle": opener.subtitle,
                                    "imageURL": opener.imageURL
                                ] as? [String : Any?]
                            }
                        ]
                    }
                    EventEmitter.sharedInstance.dispatch(
                        name: EventName.spacesChanged.key,
                        body: mappedSpaces
                    )
                }
            EventEmitter.sharedInstance.store(publisher: publisher)
        }
    }

    @objc(setPushToken:)
    func setPushToken(token: NSString) {
        let token = token as String
        if #available(iOS 13.0, *) {
            Task { @MainActor in
                UnflowSDK.client.registerToken(token: token)
            }
        }
    }

    @objc static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    @objc func methodQueue() -> DispatchQueue {
        return DispatchQueue.main
    }
}
