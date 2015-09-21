//helper methods for arrays
Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
};

//read contents of json file
var Index = function() {};
Index.prototype.getContent = function (url) {
	var content;
	$.ajax({
    url: url, // path to file
    dataType: 'json', // type of file (text, json, xml, etc)
    async: false,
    success: function(data) { // callback for successful completion
      content = data;   
    }  
  })
return content; 
};

Index.prototype.createIndex = function (url) {
	var docs = this.getContent(url);
	var arrayOfText = new Array(docs.length);
	var concatText = new Array();
	var index = {};
	for(var i = 0, docLength = docs.length; i < docLength; i++){
		arrayOfText[i] = docs[i].text.toLowerCase();
		//remove characters except numbers,space, upper/lowercase letters
		//and splits text into words
		arrayOfText[i] = arrayOfText[i].replace(/[^A-Za-z0-9 ]/g,"").split(" ");
		//concat text from both books
		concatText = concatText.concat(arrayOfText[i]);
	}
	//create index object with unique words form text as keys
	for(var i = 0, maxNumOfKeys = concatText.length; i < maxNumOfKeys; i++){
		//also takes care of duplicating keys
		index[concatText[i]] = []; 
	}
	//populate index object with array values indication occurence of words
	for(var i = 0, docLength = docs.length; i < docLength; i++){
		arrayOfText[i].unique().forEach(function (element) {
    	if(index[element])
    		index[element].push(i);
		});
	}
	//attaches index to instance(after thought)
	this.index = index; 
	return index;
}

//retrieves index
Index.prototype.getIndex = function (url) {
	this.createIndex(url);
	return this.index;	
}
//checks for supplied argument(s) in text and returns
//result in an array
Index.prototype.searchIndex = function () {
	var result = [];
	for(arg in arguments){
		var word = arguments[arg].toLowerCase();
		console.log(word);
		if(this.index[word]){
			result.push(this.index[word]);
		}
		else {
			result.push('match not found');
		}
	}
	console.log(result);
	return result;
}
   
var ali = new Index();
ali.createIndex('../books.json');
ali.searchIndex('tight','alice','switch','hobbit');