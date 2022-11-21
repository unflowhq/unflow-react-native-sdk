//
//  UnflowMetadataBridge.swift
//  unflow-react-native
//
//  Created by Alex Logan on 12/10/2022.
//

import Foundation
import UnflowUI

struct UnflowMetadataBridge {
    static let dateFormatter = ISO8601DateFormatter()

    static func convert(metadata: NSDictionary) -> [String: UnflowAnalyticsValue] {
        metadata.compactMap { (key: Any, value: Any) -> (String, UnflowAnalyticsValue)? in
            guard let key = key as? String, let value = convertToAnalyticsValue(value) else { return nil }
            return (key, value)
        }.reduce(into: [:], { $0[$1.0] = $1.1 })
    }

    private static func convertToAnalyticsValue(_ value: Any) -> UnflowAnalyticsValue? {
        if let analyticsValue = value as? UnflowAnalyticsValue {
            return analyticsValue
        } else if let numberValue = value as? NSNumber {
            if CFGetTypeID(numberValue) == CFBooleanGetTypeID() {
                return numberValue.boolValue
            } else {
                return numberValue.doubleValue
            }
        } else if let stringValue = value as? NSString {
            let swiftString = String(stringValue)
            if let date = dateFormatter.date(from: swiftString) {
                return date as Date
            } else {
                return swiftString
            }
        } else if let array = value as? NSArray {
            return array.compactMap(convertToAnalyticsValue)
        } else if let dictionary = value as? NSDictionary {
            return convert(metadata: dictionary)
        }
        print("Unflow: Parameter of type \(type(of: value)) could not be stored in event metadata")
        return nil
    }
}
