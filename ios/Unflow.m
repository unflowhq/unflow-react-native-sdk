#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Unflow, NSObject)

RCT_EXTERN_METHOD(initialize:(NSString *)apiKey withEnableLogging:(BOOL)enableLogging)

RCT_EXTERN_METHOD(sync)

@end
