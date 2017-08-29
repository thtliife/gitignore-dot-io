#!/usr/bin/env node
'use babel';
const ignore = require('./app/ignore');
const pkg = require('./package.json');
const help = require('@maboiteaspam/show-help');
let argv = process.argv;
let argvCount = argv.length;
let args = [];

function usage() {
  /*

  gitignore-dot-io

      Usage
          gitignore-dot-io filter filter filter

      Options
          filter: Any filters you would like to apply to the request
            Any number may be specified

          -h, --help: Display this help

      Examples
          gitignore-dot-io windows node bower
            Generates a gitignore file tailored for
            node and bower development on windows

          gitignore-dot-io osx c
            Generates a gitignore file tailored for
            c development on mac osx

          gitignore-dot-io
            Displays a list of available filters to
            choose from, before generating a file
            tailored to the selected filters

  */
}

for (let i = 2; i < argvCount; i++) {
  if (argv[i].toLowerCase() === '-h' || argv[i].toLowerCase() === '--help') {
    help.print(usage, pkg) && process.exit(0); // show help, // and exit.
  }
  args.push(argv[i]);
}

ignore
  .getFilters()
  .then(filters => {
    return ignore.validateFilters(args, filters);
  })
  .then(validFilters => {
    return ignore.getIgnoreFile(validFilters);
  })
  .then(fileContent => {
    return ignore.saveIgnoreFile(fileContent);
  })
  .then(result => {
    console.info(result);
  })
  .catch(err => {
    console.error(err);
  });
