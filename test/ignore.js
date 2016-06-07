'use babel'
/* global describe, it, before */
const expect = require('chai').expect
const ignore = require('../app/ignore')
let results = {}
ignore.testMode = true

describe('Ignore Dot IO .gitignore generator', function () {
  this.timeout(5000)
  this.timeout
  describe('Get list of available filters', () => {
    before((done) => {
      ignore.getFilters()
      .then((returnedFilters) => {
        results.filters = returnedFilters
        done()
      })
    })
    it('retrieves an array of available filters from:\n\thttps://gitignore.io/api/list', () => {
      expect(results.filters).to.be.instanceOf(Array)
    })
  })
  describe('Validate the passed filter', () => {
    before((done) => {
      ignore.validateFilters(['osx', 'node'], results.filters)
      .then((validatedFilters) => {
        results.filtersOnlyValid = validatedFilters
        ignore.validateFilters(['windows', 'blah', 'bower'], results.filters)
        .then((validatedFilters) => {
          results.filtersSansInvalid = validatedFilters
          done()
        })
      })
    })
    it('should return the Array:\n\t[\'osx\',\'node\']', () => {
      expect(results.filtersOnlyValid).to.deep.equal(['osx', 'node'])
    })
    it('should return the Array:\n\t[\'windows\',\'bower\'] (invalid filter \'blah\' should be removed)', () => {
      expect(results.filtersSansInvalid).to.deep.equal(['windows', 'bower'])
    })
  })
  describe('Get gitignore file for specific filters', () => {
    before((done) => {
      ignore.getIgnoreFile(results.filtersOnlyValid)
      .then((contents) => {
        results.retrievedFile = contents
        results.fileHeader = contents.split('\n')[1]
        done()
      })
    })
    it('should retrieve a gitignore file using the \'osx\' & \'node\' filters', () => {
      expect(results.fileHeader).to.equal('# Created by https://www.gitignore.io/api/osx,node')
    })
  })
  describe('Get failure reason for bad filter query', () => {
    before((done) => {
      ignore.getIgnoreFile(['blah'])
      .then((contents) => {
        results.retrievedFileError = contents
        for (let line of contents.split('\n')) {
          if (line.indexOf('#!! ERROR') > -1) {
            if (!results.fileErrors) { results.fileErrors = [line] } else { results.fileErrors.push(line) }
          }
        }
        done()
      })
    })
    it('should retrieve an error result using the \'blah\' filter', () => {
      expect(results.fileErrors).to.have.length.above(0)
    })
  })
})
