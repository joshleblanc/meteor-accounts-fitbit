Accounts.oauth.registerService('fitbit');

if (Meteor.isClient) {
    const loginWithFitbit = (options, callback) => {
        // support a callback without options
        if (!callback && typeof options === "function") {
            callback = options;
            options = null;
        }

        const credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
        Fitbit.requestCredential(options, credentialRequestCompleteCallback);
    };

    const linkWithFitbit = function(options, callback) {
        if (!Meteor.userId()) {
            throw new Meteor.Error(402, 'Please login to an existing account before link.');
        }
        if (!callback && typeof options === 'function') {
            callback = options;
            options = null;
        }

        const credentialRequestCompleteCallback = Accounts.oauth.linkCredentialRequestCompleteHandler(callback);
        Fitbit.requestCredential(
          options,
          credentialRequestCompleteCallback
        );
    };

    Accounts.registerClientLoginFunction('fitbit', loginWithFitbit);
    Meteor.loginWithFitbit = (...args) => Accounts.applyLoginFunction('fitbit', args);
    Meteor.linkWithFitbit = (...args) => linkWithFitbit(...args);
}