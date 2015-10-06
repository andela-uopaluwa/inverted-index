describe("Read Book Data", function() {
  it("should confirm that file is not empty", function() {
  	var book = ali.getContent('../books.json');
    expect(book).toBeTruthy(true);
    expect(book.length).not.toBe(0);
    for(i = 0, numOfBooks = book.length; i < numOfBooks; i++){
    	for(key in book[i])
    		expect(typeof(book[i][key])).toBe('string');
    }
	});
});

describe("Populate Index", function() {
  var index = ali.createIndex('../books.json');
  var book = ali.getContent('../books.json');
  it("should create an index from documents passed in ", function() {
  	expect(typeof(index)).toBe('object'); //checks that createIndex returns an object
  	expect(Object.keys(index).length).not.toBe(0); //checks that returned object is not empty(has keys)
  	for(word in index){
  		expect((index[word]).length).not.toBe(0); //checks that each value is a non-empty array i.e matches every key/unique word ) 
  	}
  	expect(index.alice).toEqual([0]);
  	expect(index.a).toEqual([0,1]);
  	expect(index.ring).not.toEqual([0]);
  	expect(index.elf).toEqual([1]);
  });

  it("should check that index is accurate", function() {
  	expect(index.alice).toEqual([0]);
  	expect(index.a).toEqual([0,1]);
  	expect(index.ring).not.toEqual([0]);
  	expect(index.elf).toEqual([1]);
  });
});

describe("Search index", function() {
 it("should fetch the index for search term", function() {
   	expect(ali.searchIndex('tight')).toEqual(['match not found']);
    expect(ali.searchIndex('hobbit')).toEqual([[1]]);
    expect(ali.searchIndex('alice','powerful','a')).toEqual([[0],[1],[0,1]]);
    expect(ali.searchIndex('elf','powerful','ogre')).toEqual([[1],[1],'match not found']);
  });
});
