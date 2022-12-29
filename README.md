# Thought Process

My first thought when reading through the prompt was to iterate through the scannedTextObject array, and for each object check to see if the "searchTerm" exists in the child objects. 

Since the scannedTextObject is nested we have to iterate through each element in the scannedTextObject, which is one or many books, and for each book we have to check the contents of the scanned book to see if the search term exists in the text. If the search term does exist, we append the ISBN of the current book to we are searching through to the result, along with the page and line number. Resulting in an output object that tells us that the word exists in this specific book, indicated by the ISBN number, and at a specific page and line number.