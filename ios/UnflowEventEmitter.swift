import UnflowUI
import Foundation
import Combine

@available(iOS 13.0, *)
@objc(UnflowEventEmitter)
class UnflowEventEmitter: RCTEventEmitter {

    fileprivate var cancellables = Set<AnyCancellable>()
    fileprivate var hasListeners: Bool = false

    override init() {
        super.init()
        EventEmitter.sharedInstance.registerEventEmitter(eventEmitter: self)
    }

    override func startObserving() {
        hasListeners = true
    }

    override func stopObserving() {
        cancellables.forEach { $0.cancel() }
        cancellables.removeAll()
        hasListeners = false
    }

    @objc open override func supportedEvents() -> [String] {
        EventName.allCases.map(\.key)
    }

    @objc override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}

@objc enum EventName: Int, CaseIterable {
    case openersChanged, spacesChanged, eventReceived, attributesUpdated

    var key: String {
        switch self {
        case .openersChanged:
            return "OpenersChanged"
        case .spacesChanged:
            return "SpacesChanged"
        case .eventReceived:
            return "EventReceived"
        case .attributesUpdated:
            return "AttributesUpdated"
        }
    }
}

@available(iOS 13.0, *)
class EventEmitter {

    public static var sharedInstance = EventEmitter()
    private static var eventEmitter: UnflowEventEmitter!

    private init() {}

    func registerEventEmitter(eventEmitter: UnflowEventEmitter) {
        EventEmitter.eventEmitter = eventEmitter
    }

    func dispatch(name: String, body: Any?) {
        if (EventEmitter.eventEmitter.hasListeners) {
            EventEmitter.eventEmitter.sendEvent(withName: name, body: body)
        }
    }

    func store(publisher: AnyCancellable) {
        publisher.store(in: &EventEmitter.eventEmitter.cancellables)
    }
}
