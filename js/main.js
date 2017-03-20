var booksPerPage = 30;

var booksProject = {
	books: [],
	currentPage: 0
};

//getting data from json file 

booksProject.getData = function() {
	$.getJSON("books.json", function(data) {
		booksProject.books = data;
		booksProject.showData();
	})
};

booksProject.showData = function() {
	$('section.books').empty();

	var startIndex = booksProject.currentPage * booksPerPage;
	for (var i = startIndex; i < startIndex + booksPerPage && i < booksProject.books.length; i++) {
		var book = booksProject.books[i];
		var bookCover = book.cover;
		var bookTitle = book.title;
		var bookAuthor = book.author;
		var bookYear = book.year;
		$('section.books').append('<div class="bookBox"><img src="' + bookCover + '"><div class="cardStyle"><h2>' + bookTitle + '</h2><h3>' + bookAuthor + '</h3><p>' + bookYear + '</p></div></div>');	  
	}

	// $.each(booksProject.books, function(key, value) {
	// 	var bookCover = value.cover;
	// 	var bookTitle = value.title;
	// 	var bookAuthor = value.author;
	// 	var bookYear = value.year;
	// 	$('section.books').append('<div class="bookBox"><img src="' + bookCover + '"><div class="cardStyle"><h2>' + bookTitle + '</h2><h3>' + bookAuthor + '</h3><p>' + bookYear + '</p></div></div>');	  
	// });
}

booksProject.init = function() {
	//Call main functions
	booksProject.getData();
};

var bookAuthorComparator = function(leftBook, rightBook) {
	return leftBook.author.localeCompare(rightBook.author);
} 

var bookTitleComparator = function(leftBook, rightBook) {
	return leftBook.title.localeCompare(rightBook.title);
} 

var bookYearComparator = function(leftBook, rightBook) {
	return rightBook.year - leftBook.year;
} 

//Document Ready
$(document).ready(function() {
	booksProject.init();

	$('input[type="radio"]').click(function() {
		if ($(this).is(':checked')) {
			var radioValue = $(this).val();
			if (radioValue == "author") {
				booksProject.books.sort(bookAuthorComparator);
			} else if (radioValue == 'title') {
				booksProject.books.sort(bookTitleComparator);
			} else {
				booksProject.books.sort(bookYearComparator);
			}
			booksProject.showData();
		}
	})

	//next and previous buttons
	$('button.next').click(function() {
		if (booksProject.currentPage * booksPerPage >= booksProject.length) {
			return;
		}
		booksProject.currentPage++;
		booksProject.showData(); 
	})

	$('button.previous').click(function() {
		if (booksProject.currentPage == 0) {
			return;
		}
		booksProject.currentPage--;
		booksProject.showData(); 
	})

});