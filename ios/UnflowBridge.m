#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Unflow, NSObject)

RCT_EXTERN_METHOD(initialize:(NSString *)apiKey withEnableLogging:(BOOL *)enableLogging)
RCT_EXTERN_METHOD(sync)
RCT_EXTERN_METHOD(close)
RCT_EXTERN_METHOD(pause)
RCT_EXTERN_METHOD(setUserId:(NSString *)userId)
RCT_EXTERN_METHOD(setAttributes:(NSDictionary *)attributes)
RCT_EXTERN_METHOD(setCustomFonts:(NSDictionary *)fonts)
RCT_EXTERN_METHOD(openScreen:(double *)screenId)
RCT_EXTERN_METHOD(trackEvent:(NSString *)eventName withMetadata:(NSDictionary *)metadata)
RCT_EXTERN_METHOD(deregisterToken)
RCT_EXTERN_METHOD(clearUserSession)
RCT_EXTERN_METHOD(openers:(NSString *)spaceKey)
RCT_EXTERN_METHOD(spaces)
RCT_EXTERN_METHOD(addListener:(NSString *)eventName)
RCT_EXTERN_METHOD(removeListeners:(NSInteger)count)
RCT_EXTERN_METHOD(setPushToken:(NSString *)token)
RCT_EXTERN_METHOD(setLocale:(NSString *)locale withLanguage:(NSString*)language)
@end
