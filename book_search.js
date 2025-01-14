/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var result = {
        "SearchTerm": "",
        "Results": []
    };

    result.SearchTerm = searchTerm
    scannedTextObj.forEach(book => {
        if(Object.keys(book).length == 0){return result}
        book.Content.forEach(scannedObj =>{
            if(typeof scannedObj !== 'undefined'){ // Will break not go here if there is a hyphenated multiple word at the end of the scanned text because there is nothing to create
                /**if the subsequent string ends with a hyphenated character and the next scanned object is the next line and same page as the current line and page */
                if(scannedObj.Text.endsWith("-") && book.Content[book.Content.indexOf(scannedObj) + 1].Line == scannedObj.Line + 1 && (book.Content[book.Content.indexOf(scannedObj) + 1].Page == scannedObj.Page) == true ){ 
                    let scrubbedSentence = scannedObj.Text.slice(0, -1)
                    subsequentString = book.Content[book.Content.indexOf(scannedObj) + 1].Text.split(' ')[0]
                    scannedObj.Text = scrubbedSentence.concat(subsequentString)              
                    book.Content[book.Content.indexOf(scannedObj) + 1].Text = scrubbedSentence.split(' ').pop() + book.Content[book.Content.indexOf(scannedObj) + 1].Text
                }
            }
            if(new RegExp('\\b' + searchTerm + '\\b').test(scannedObj.Text)){ //checks if the word is in the scanned text, search term is case sensitive and must contain special characters.
                result.Results.push({
                    "ISBN": book.ISBN,
                    "Page": scannedObj.Page,
                    "Line": scannedObj.Line
                })
            }
        })
    });
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]


/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const positive_test_output1 = {
    "SearchTerm": "eyes were",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        }
    ]
}

const positive_test_output2 = {
    "SearchTerm": "and",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 10
        }
    ]
}
/**Negative test ouputs */
const negative_test_output = {
    "SearchTerm": "the quick brown fox jumps over the lazy dog",
    "Results": []
}

const case_sensitive_test_output = {
    "SearchTerm": "Canadian's",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}



/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}



/**Positive test cases*/
/**Checking to see if the desired output matches with the output from the function */
const positive_test_result_1 = findSearchTermInBooks("eyes were", twentyLeaguesIn);
if (JSON.stringify(positive_test_output1) === JSON.stringify(positive_test_result_1)) {
    console.log("PASS: Positive Test 1");
} else {
    console.log("FAIL: Positive Test 1");
    console.log("Expected:", positive_test_output1);
    console.log("Received:", positive_test_result_1);
}

/**Testing multiple positive results */

/**checking to see if the find search term returns multiple records in the correct order. */
const multiple_positive_results = findSearchTermInBooks("and", twentyLeaguesIn); 
if (multiple_positive_results.Results.length == 2) {
    console.log("PASS: Positive Test 2");
} else {
    console.log("FAIL: Positive Test 2");
    console.log("Expected:", positive_test_output2.Results.length);
    console.log("Received:", multiple_positive_results.Results.length);
}

const multiple_positive_results_2 = findSearchTermInBooks("and", twentyLeaguesIn);
if (JSON.stringify(positive_test_output2) === JSON.stringify(multiple_positive_results_2)) {
    console.log("PASS: Positive Test 3");
} else {
    console.log("FAIL: Positive Test 3");
    console.log("Expected:", positive_test_output2);
    console.log("Received:", multiple_positive_results_2);
}


/**Negative test cases*/

const negative_test_result = findSearchTermInBooks(123414213123, twentyLeaguesIn); 
if (negative_test_result.Results.length == 0) {
    console.log("PASS: Negative Test 1");
} else {
    console.log("FAIL: Negative Test 2");
    console.log("Expected:", 0);
    console.log("Received:", negative_test_result.Results.length);
}

const negative_test_result2 = findSearchTermInBooks("the quick brown fox jumps over the lazy dog", twentyLeaguesIn); 
if (negative_test_result2.Results.length == 0) {
    console.log("PASS: Negative Test 2");
} else {
    console.log("FAIL: Negative Test 2");
    console.log("Expected:", 0);
    console.log("Received:", negative_test_result2.Results.length);
}

const negative_test_result3 = findSearchTermInBooks("the quick brown fox jumps over the lazy dog", twentyLeaguesIn); 
if (JSON.stringify(negative_test_output) === JSON.stringify(negative_test_result3)) {
    console.log("PASS: Negative Test 3");
} else {
    console.log("FAIL: Negative Test 3");
    console.log("Expected:", negative_test_output);
    console.log("Received:", negative_test_result3);
}

/**Case Sensitive Test cases*/

const case_sensitive_test_result = findSearchTermInBooks("Canadian's", twentyLeaguesIn); 
if (JSON.stringify(case_sensitive_test_output) === JSON.stringify(case_sensitive_test_result)) {
    console.log("PASS: Case-sensitive Test 1");
} else {
    console.log("FAIL: Case-sensitive Test 1");
    console.log("Expected:", case_sensitive_test_output);
    console.log("Received:", case_sensitive_test_result);
}

const case_sensitive_test_result2 = findSearchTermInBooks("canadian's", twentyLeaguesIn);
if (case_sensitive_test_result2.Results.length == 0) {
    console.log("PASS: Case-sensitive Test 2");
} else {
    console.log("FAIL: Case-sensitive Test 2");
    console.log("Expected:", 0);
    console.log("Received:", case_sensitive_test_result2.Results.length);
}


/**Multi input tests */


/**Test Data */

const multipleBookIn = [
    {
        "Title": "The Catcher in the Rye",
        "ISBN": "9780316769532",
        "Content": [
            {
                "Page": 15,
                "Line": 12,
                "Text": "The quick brown Fox's jumps over the father-in-law's"
            },
            {
                "Page": 88,
                "Line": 25,
                "Text": "May the force be with you"
            },
            {
                "Page": 99,
                "Line": 13,
                "Text": "Luke I am your father"
            }
        ]
    },
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

const multi_book_test_output = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780316769532",
            "Page": 15,
            "Line": 12,
        },
        {
            "ISBN": "9780316769532",
            "Page": 88,
            "Line": 25,
            
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/**Multi input unit tests */
const multi_book_test_output_result = findSearchTermInBooks("the", multipleBookIn); 
if (JSON.stringify(multi_book_test_output) === JSON.stringify(multi_book_test_output_result)) {
    console.log("PASS: Multiple input Test 1");
} else {
    console.log("FAIL: Multiple input Test 1");
    console.log("Expected:", multi_book_test_output);
    console.log("Received:", multi_book_test_output_result);
}

const multi_book_test_output_result2 = findSearchTermInBooks("the", multipleBookIn);
if (multi_book_test_output_result2.Results.length == 3) {
    console.log("PASS: Multiple input Test 2");
} else {
    console.log("FAIL: Multiple input Test 2");
    console.log("Expected:", 3);
    console.log("Received:", multi_book_test_output_result2.Results.length);
}


const hyphenated_character_test_output = {
    "SearchTerm": "father-in-law's",
    "Results": [
        {   "ISBN": "9780316769532",
            "Page": 15,
            "Line": 12,
        },
    ]
}


const hyphenated_character_test_result = findSearchTermInBooks("father-in-law's", multipleBookIn);
if (JSON.stringify(hyphenated_character_test_output) === JSON.stringify(hyphenated_character_test_result)) {
    console.log("PASS: Special character input Test 1");
} else {
    console.log("FAIL: Special character Test 1");
    console.log("Expected:", hyphenated_character_test_output);
    console.log("Received:", hyphenated_character_test_result);
}

/**Hyphenated word spanning panning multiple lines Edge Case */

const hyphenated_multi_line_word_test_output = {
    "SearchTerm": "darkness",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        },
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
]
}

const hyphenated_multi_line_word_test_output_result = findSearchTermInBooks("darkness", twentyLeaguesIn); 
if (JSON.stringify(hyphenated_multi_line_word_test_output) === JSON.stringify(hyphenated_multi_line_word_test_output_result)) {
    console.log("PASS: Hyphenated multiple line spanning word input Test 1");
} else {
    console.log("FAIL: Hyphenated multiple line spanning word input Test 1");
    console.log("Expected:", hyphenated_multi_line_word_test_output);
    console.log("Received:", hyphenated_multi_line_word_test_output_result);
}

/**Null test */

const null_test_in = [{}]

const null_test_output = {
    "SearchTerm": "",
    "Results": []
};


const null_test_result = findSearchTermInBooks("", null_test_in); 
if (JSON.stringify(null_test_output) === JSON.stringify(null_test_result)) {
    console.log("PASS: Null input Test 1");
} else {
    console.log("FAIL: Null input Test 1");
    console.log("Expected:", null_test_output);
    console.log("Received:", null_test_result);
}