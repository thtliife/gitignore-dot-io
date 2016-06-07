'use babel'
const request = require('request')
const colors = require('colors')
const fs = require('fs')
const inquirer = require('inquirer')
const api = 'https://gitignore.io/api'

let giFunctions = {
  testMode: false,
  getFilters: () => {
    if (!giFunctions.testMode) { console.info('Getting valid filter list from gitignore.io...') }
    return new Promise((resolve, reject) => {
      request(api + '/list', (error, response, body) => {
        if (error) {
          reject(error)
        }
        if (response.statusCode.toString() === '200') {
          let filters = []
          try {
            let lines = (body.split('\n'))
            for (let line of lines) {
              for (let filter of line.split(',')) {
                filters.push(filter)
              }
            }
            resolve(filters)
          } catch (err) {
            reject(err)
          }
        } else {
          reject(response)
        }
      })
    })
  },
  validateFilters: (filters, supportedFilters) => {
    if (!giFunctions.testMode) { console.info(`Validating filters ${filters}...`) }
    return new Promise((resolve, reject) => {
      try {
        let validFilters = []
        for (let filter of filters) {
          filter = filter.toLowerCase()
          if (supportedFilters.indexOf(filter) > -1) {
            validFilters.push(filter)
          } else {
            if (!giFunctions.testMode) {
              console.warn(colors.yellow('Skipping filter \'' + colors.underline.yellow(filter) + '\' (Not supported)'))
            }
          }
        }
        if (validFilters.length > 0) {
          resolve(validFilters)
        } else {
          resolve(giFunctions.showMenu(supportedFilters))
        }
      } catch (err) {
        reject(err)
      }
    })
  },
  getIgnoreFile: (filters) => {
    if (!giFunctions.testMode) { console.info(`Retrieving gitignore file for ${filters}...`) }
    return new Promise((resolve, reject) => {
      let filterString = filters.join()
      request(api + '/' + filterString, (error, response, body) => {
        if (error) {
          reject(error)
        }
        if (response.statusCode.toString() === '200') {
          resolve(body)
        } else {
          reject(new Error((colors.red('Failed with status: ' + response.statusCode + ' (' + response.statusMessage + ')'))))
        }
      })
    })
  },
  saveIgnoreFile: (fileContent) => {
    if (!giFunctions.testMode) { console.info('Saving the retrieved gitignore file...') }
    return new Promise((resolve, reject) => {
      fs.writeFile('./.gitignore', fileContent, (err, res) => {
        if (err) { reject(err) }
        fs.realpath('./.gitignore', (err, realpath) => {
          if (err) { reject(err) }
          resolve('Created file: ' + realpath)
        })
      })
    })
  },
  showMenu: (supportedFilters) => {
    return new Promise((resolve, reject) => {
      let choiceList = []
      for (let filter of supportedFilters) {
        choiceList.push({
          name: filter
        })
      }
      inquirer.prompt([
        {
          type: 'checkbox',
          message: 'Which filters would you like to use?',
          name: 'filters',
          choices: choiceList,
          validate: function (answer) {
            if (answer.length < 1) {
              return 'You must choose at least one filter.'
            }
            return true
          }
        }
      ]).then(function (answers) {
        resolve(answers.filters)
      })
    })
  }
}
module.exports = giFunctions
