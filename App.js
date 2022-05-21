/* eslint-disable no-unused-vars */
import React, {useState, useEffect, useRef} from 'react';
import {BackHandler, Platform} from 'react-native';

import {WebView} from 'react-native-webview';

const App = () => {
  const webView = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const urlAbsensi = 'https://abs.naftech.web.id/absen/';
  const urlPob = 'https://pemalicomal.com/pob/';

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', HandleBackPressed);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', HandleBackPressed);
      };
    }
  }, []); // INITIALIZE ONLY ONCE

  const HandleBackPressed = () => {
    if (webView.current) {
      webView.current.goBack();
      return true; // PREVENT DEFAULT BEHAVIOUR (EXITING THE APP)
    }
    return false;
  };

  return (
    <>
      {/* <WebView
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        domStorageEnabled={true}
        useWebKit
        originWhitelist={['*']}
        allowUniversalAccessFromFileURLs={true}
        source={{
          uri: 'https://absensi.pemalicomal.com/',
        }}
      /> */}
      <WebView
        ref={webView}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        domStorageEnabled={true}
        useWebKit
        // originWhitelist={['*']}
        originWhitelist={['https://*', 'http://*', 'file://*', 'sms://*']}
        allowUniversalAccessFromFileURLs={true}
        userAgent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"
        source={{
          uri: urlPob,
        }}
        onNavigationStateChange={navState => setCanGoBack(navState.canGoBack)}
      />
    </>
  );
};

export default App;
