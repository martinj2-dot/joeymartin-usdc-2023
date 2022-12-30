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
        book.Content.forEach(scannedObj =>{
            if(scannedObj.Text.includes(searchTerm)){
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

const negative_test_output = {
    "SearchTerm": "the quick brown fox jumps over the lazy dog",
    "Results": []
}

const case_sensitive_test_output = {
    "SearchTerm": "Canadian",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
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

const case_sensitive_test_result = findSearchTermInBooks("Canadian", twentyLeaguesIn); 
if (JSON.stringify(case_sensitive_test_output) === JSON.stringify(case_sensitive_test_result)) {
    console.log("PASS: Case-sensitive Test 1");
} else {
    console.log("FAIL: Case-sensitive Test 1");
    console.log("Expected:", case_sensitive_test_output);
    console.log("Received:", case_sensitive_test_result);
}

const case_sensitive_test_result1 = findSearchTermInBooks("canadian", twentyLeaguesIn);
if (case_sensitive_test_result1.Results.length == 0) {
    console.log("PASS: Case-sensitive Test 2");
} else {
    console.log("FAIL: Case-sensitive Test 2");
    console.log("Expected:", 0);
    console.log("Received:", case_sensitive_test_result1.Results.length);
}


/** */