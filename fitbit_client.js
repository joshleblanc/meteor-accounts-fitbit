import Fitbit from './namespace.js';

Fitbit.requestCredential = (options, credentialRequestCompleteCallback) => {
    if (!credentialRequestCompleteCallback && typeof options === 'function') {
        credentialRequestCompleteCallback = options;
        options = {};
    } else if (!options) {
        options = {};
    }

    const config = ServiceConfiguration.configurations.findOne({service: 'fitbit'});
    if (!config) {
        credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError());
        return;
    }

    const credentialToken = Random.secret();

    const scope = (options && options.requestPermissions) || ['profile'];
    const flatScope = scope.map(encodeURIComponent).join('+');

    const loginStyle = OAuth._loginStyle('fitbit', config, options);
    console.log(OAuth._redirectUri('fitbit', config));

    const loginUrl =
        'https://www.fitbit.com/oauth2/authorize' +
        '?client_id=' + config.clientId +
        '&response_type=code' +
        '&scope=' + flatScope +
        '&redirect_uri=' + OAuth._redirectUri('fitbit', config) +
        '&state=' + OAuth._stateParam(loginStyle, credentialToken, options && options.redirectUrl);

    OAuth.launchLogin({
        loginService: 'fitbit',
        loginStyle,
        loginUrl,
        credentialRequestCompleteCallback,
        credentialToken,
        popupOptions: {width: 450, height: 750}
    });
};