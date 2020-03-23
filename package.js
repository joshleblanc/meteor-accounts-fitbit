Package.describe({
  name: 'cereal:accounts-fitbit',
  version: '1.0.1',
  // Brief, one-line summary of the package.
  summary: 'Adds account support for Fitbit',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/joshleblanc/meteor-accounts-fitbit',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.use('ecmascript@0.12.4');
  api.use('accounts-base@1.4.3', ['client', 'server']);
  api.use('bozhao:link-accounts');
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);

  api.use('accounts-oauth@1.1.16', ['client', 'server']);
  api.use('oauth2@1.2.1', ['client', 'server']);
  api.use('oauth@1.2.7', ['client', 'server']);
  api.use('http@1.4.2', 'server');
  api.use('random@1.1.0', 'client');
  api.use('service-configuration@1.0.11', ['client', 'server']);

  api.addFiles('fitbit.js');

  api.addFiles('fitbit_client.js', 'client');
  api.addFiles('fitbit_server.js', 'server');

  api.mainModule('namespace.js');

  api.export('Fitbit');
});