const InvertedIndexhelper = require('./inverted-index-helper');
const IndexClass = require('./inverted-index');
const empty = require('../spec/empty');
const invalidFile = require('../spec/invalid.json');
const fs = require('fs');
const path = require('path');

const book = fs.readFileSync(path.resolve(__dirname, 'books.json'));

describe('Inverted Index', () => {
  const InvertedIndex = new IndexClass(InvertedIndexhelper);
  const file1 = book;
  const file2 = empty;
  const file3 = invalidFile;

  afterEach(() => {
    InvertedIndex.indexTable = {};
  });
  
  it('should be truthy for the instance of the class', () => {
    const indexInstance = InvertedIndex;
    expect(InvertedIndex instanceof IndexClass).toBeTruthy();
  });
  it('should return zero for the length of the indexes', () => {
    const indexInstance = InvertedIndex;
    expect(Object.keys(InvertedIndex.indexTable).length).toBe(0);
  });

  describe('Read Book Data', () => {
    const notEmpty = file2;
    it('throws error if file is empty', () => {
      expect(() => InvertedIndexhelper.isValidFile(file2)).toThrow(new Error("File invalid"));
    });
    // should return boolean - test for empty array
    it('returns an array if the content of the file is a valid JSON array', () => {
      const file = InvertedIndexhelper.isValidFile(file1);
      expect(file).toBeTruthy();
    });
    it('returns false if the content of the file is not a valid JSON array', () => {
      expect(() => InvertedIndexhelper.isValidFile(file3)).toThrow(new Error("File invalid"));
    });
    it('does not overwrite previously created indices', () => {
      const validBook = JSON.parse(book);
      InvertedIndex.createIndex('bk', validBook);
      InvertedIndex.createIndex('bk2', validBook);
      expect(InvertedIndex.indexTable.hasOwnProperty('bk')).toBe(true);
    });
  });

  describe('Populate Index', () => {
    it('returns false if file content is not passed', () => {
      const fileContent = null;
      expect(InvertedIndex.createIndex('bk', fileContent)).toBe(false);
    });
    it('returns an array that contains the indexes of a word', () => {
      const validBook = JSON.parse(book);
      InvertedIndex.files.bk = validBook;
      InvertedIndex.createIndex('bk', validBook);
      expect(InvertedIndex.getIndex('bk').bk.alice).toEqual([0]);
    });
  });

  describe('Search Index', () => {
    it('should return correct index of searched term', () => {
      const validBook = JSON.parse(book);
      InvertedIndex.files.bk = validBook;
      InvertedIndex.createIndex('bk', validBook);
      expect(InvertedIndex.searchIndex('bk', 'alice')).toEqual({bk: { alice: [0] }});
    });
    it('should return false when no result is found', () => {
      const validBook = JSON.parse(book);
      InvertedIndex.files.bk = validBook;
      InvertedIndex.createIndex('bk', validBook);
      expect(InvertedIndex.searchIndex('bk', 'magrain')).toEqual({bk: { magrain: [] }});
    });

    it(`should return search result for a varied number of search terms`, () => {
      const validBook = JSON.parse(book);
      InvertedIndex.files.bk = validBook;
      InvertedIndex.createIndex('bk', validBook);
      const variedNumber = InvertedIndex.searchIndex('bk',['alice ring']);
      expect(variedNumber.bk.alice).toEqual([0])
      expect(variedNumber.bk.ring).toEqual([1]);
      });
    });

    it('Should ensure searchIndex can handle an array of search terms.', () => {
      const validBook = JSON.parse(book);
      InvertedIndex.files.bk = validBook;
      InvertedIndex.createIndex('bk', validBook);
      const arrayResult = InvertedIndex.searchIndex('bk',[['books.json'], ['unusual', 'alice']]);
      expect(arrayResult.bk.unusual).toEqual([1]);
      expect(arrayResult.bk.alice).toEqual([0]);
    });
  });

