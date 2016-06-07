# gitignore-dot-io

The gitignore-dot-io module allows for easy generation of gitignore files from
the [gitignore.io](http://www.gitignore.io) api.

[![Wercker](https://img.shields.io/wercker/ci/wercker/docs.svg?maxAge=2592000)](https://github.com/thtliife/gitignore-dot-io)
[![GitHub issues](https://img.shields.io/github/issues/thtliife/gitignore-dot-io.svg)](https://github.com/thtliife/gitignore-dot-io/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/thtliife/gitignore-dot-io/master/LICENSE)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/thtliife/gitignore-dot-io.svg?style=social)](https://twitter.com/intent/tweet?text=Check out @thtliife%27s gitignore-dot-io module, for easy gitignore file generation!:&url=https%3A%2F%2Fgithub.com%2Fthtliife%2Fgitignore-dot-io)

## Installation

Global installation is recommended, to allow generation of a gitignore file in
any folder without specifying an absolute path to the gitignore-dot-io module.

```bash
npm install gitignore-dot-io --global
```

## Usage

  ```bash
  gitignore-dot-io filter filter filter
  ```

  Where filter is the type of filter you would like to apply.
  You may specify as many filters as you wish.
  Alternatively, if you do not specify any filters, a list will be displayed
  allowing you to select from all filters which are supported.
  Supported filters are available at the [gitignore.io website](https://www.gitignore.io/api/list)

## Examples

```bash
gitignore-dot-io windows node bower
```

Generates a gitignore file tailored for node and bower development on windows

```bash
gitignore-dot-io osx c
```

Generates a gitignore file tailored for c development on mac osx

```bash
gitignore-dot-io
```
Displays a list of available filters to choose from, before generating a file
tailored to the selected filters

## Built With

*   [NodeJS](http://nodejs.org)
*   [Atom](https://atom.io)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of
conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available,
see the [tags on this repository](https://github.com/your/project/tags).

## Authors

*   **Vito Giarrusso** - *Initial work* - [thtliife](https://github.com/thtliife)

See also the list of [contributors](https://github.com/thtliife/gitignore-dot-io/contributors)
who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE)
file for details
