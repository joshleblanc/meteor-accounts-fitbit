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

    Accounts.registerClientLoginFunction('fitbit', loginWithFitbit);
    Meteor.loginWithFitbit = (...args) => Accounts.applyLoginFunction('fitbit', args);
} else {
    Accounts.addAutopublishFields({
        forLoggedInUser: ['services.fitbit'],
        forOtherUsers: ['services.fitbit.username']
    });
}