// Get references to elements
const instructionsScreen = document.getElementById('instructions-screen');
const startQuizBtn = document.getElementById('start-quiz-btn');
const quizContainer = document.getElementById('quiz-container');
const nextButton = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const resultElement = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');

// References for new HTML elements
const questionTextElement = document.getElementById('question-text');
const questionImageElement = document.getElementById('question-image');
const questionImageContainer = document.getElementById('question-image-container');
const answerOptionsElement = document.getElementById('answer-options');

// New elements needed for your scoring/results display
let scoreSection = document.getElementById('score-section');
let finalScoreSpan;
let scoreDetailsParagraph;

// Dynamically create scoreSection if it's not in the HTML
// (This is kept for compatibility; it's generally better to have it in HTML if static)
if (!scoreSection) {
    scoreSection = document.createElement('div');
    scoreSection.id = 'score-section';
    scoreSection.innerHTML = '<h3>Your Score: <span id="final-score"></span></h3><p id="score-details"></p>';
    document.querySelector('.container').appendChild(scoreSection); // Append to your main container
    scoreSection.classList.add('hidden'); // Initially hide score section using the 'hidden' class
}
finalScoreSpan = document.getElementById('final-score');
scoreDetailsParagraph = document.getElementById('score-details');


let currentQuestionIndex = 0;
let userAnswers = []; // Array to store user's selected option index for each question


// ALL QUIZ QUESTIONS EMBEDDED DIRECTLY IN JAVASCRIPT
const quizData = [
    // Question 1: What is the output of the following code blocks?
    {
        "question_type": "image_question_image_answers",
        "question_text": "What is the output of the following code blocks?",
        "question_image": "pictures/q1.png", // Image for the input code blocks
        "image_width": "700px", // Example: Making this image wider
        "image_height": "auto",
        "answer_options": [
            {
                "image": "pictures/q1a1.png",
                "is_correct": false,
                "rationale": "This output does not match the execution of the given code blocks."
            },
            {
                "image": "pictures/q1a2.png",
                "is_correct": true,
                "rationale": "The code blocks lead to this specific visual output/result."
            },
            {
                "image": "pictures/q1a3.png",
                "is_correct": false,
                "rationale": "This output does not match the execution of the given code blocks."
            },
            {
                "image": "pictures/q1a4.png",
                "is_correct": false,
                "rationale": "This output does not match the execution of the given code blocks."
            }
        ]
    },

    // Question 2: To get the following output, what should be the code?
    {
        "question_type": "image_question_image_answers",
        "question_text": "To get the following output, what should be the code?",
        "question_image": "pictures/q2.png", // Image for the desired output
        // No image_width/height here, so it will use default responsive CSS (max-width: 100%)
        "answer_options": [
            {
                "image": "pictures/q2a1.png",
                "is_correct": true,
                "rationale": "This sequence of code blocks correctly generates the desired output (a snowflake with 8 branches, each turned by 45 degrees)."
            },
            {
                "image": "pictures/q2a2.png",
                "is_correct": false,
                "rationale": "This code block does not produce the desired output."
            },
            {
                "image": "pictures/q2a3.png",
                "is_correct": false,
                "rationale": "This code block does not produce the desired output."
            },
            {
                "image": "pictures/q2a4.png",
                "is_correct": false,
                "rationale": "This code block does not produce the desired output."
            }
        ]
    },

    // Question 3: To get the following output, What should be the code? (Options given as text, but question implies image output)
    {
        "question_type": "image_question_text_answers",
        "question_text": "To get the following output, what should be the code?",
        "question_image": "pictures/q3.png", // Assuming q3.png shows the desired output
        "answer_options": [
            {
                "text": "Option A: a, b",
                "is_correct": false,
                "rationale": "This option does not represent the correct code for the output."
            },
            {
                "text": "Option B: b, d",
                "is_correct": true,
                "rationale": "Based on the expected output, this combination of 'b' and 'd' code elements is correct."
            },
            {
                "text": "Option C: c, a",
                "is_correct": false,
                "rationale": "This option does not represent the correct code for the output."
            },
            {
                "text": "Option D: a, d",
                "is_correct": false,
                "rationale": "This option does not represent the correct code for the output."
            }
        ]
    },

    // Question 4: To draw the following output what is input code?
    {
        "question_type": "image_question_image_answers",
        "question_text": "To draw the following output, what is the input code?",
        "question_image": "pictures/q4.png", // Assuming q4.png shows the drawn output
        "image_width": "650px", // Example: Another wider image
        "image_height": "auto",
        "answer_options": [
            {
                "image": "pictures/q4a1.png",
                "is_correct": false,
                "rationale": "This code does not produce the specified drawing."
            },
            {
                "image": "pictures/q4a2.png",
                "is_correct": true,
                "rationale": "This code sequence will correctly draw the specified output."
            },
            {
                "image": "pictures/q4a3.png",
                "is_correct": false,
                "rationale": "This code does not produce the specified drawing."
            },
            {
                "image": "pictures/q4a4.png",
                "is_correct": false,
                "rationale": "This code does not produce the specified drawing."
            }
        ]
    },

    // Question 5: Choose the correct code to solve the following puzzle
    {
        "question_type": "image_question_image_answers",
        "question_text": "Choose the correct code to solve the following puzzle:",
        "question_image": "pictures/q5.png", // Assuming q5.png shows the puzzle screenshot
        "answer_options": [
            {
                "image": "pictures/q5a1.png",
                "is_correct": true,
                "rationale": "This code block sequence provides the correct solution to the puzzle."
            },
            {
                "image": "pictures/q5a2.png",
                "is_correct": false,
                "rationale": "This code does not solve the puzzle correctly."
            },
            {
                "image": "pictures/q5a3.png",
                "is_correct": false,
                "rationale": "This code does not solve the puzzle correctly."
            },
            {
                "image": "pictures/q5a4.png",
                "is_correct": false,
                "rationale": "This code does not solve the puzzle correctly."
            }
        ]
    },

    // Question 6: Choose the order of the execution for the for loop shown below.
    {
        "question_type": "image_question_text_answers",
        "question_text": "Choose the order of the execution for the for loop shown below.",
        "question_image": "pictures/q6.png", // Assuming q6.png shows the for loop code
        "answer_options": [
            {
                "text": "Option A: 1 2 3 4",
                "is_correct": false,
                "rationale": "This is not the correct order of execution for a typical 'for' loop structure (initialization, condition, body, increment)."
            },
            {
                "text": "Option B: 2 3 1 4",
                "is_correct": false,
                "rationale": "This is not the correct order of execution."
            },
            {
                "text": "Option C: 4 1 3 2",
                "is_correct": false,
                "rationale": "This is not the correct order of execution."
            },
            {
                "text": "Option D: 3 2 1 4", // Assuming common for loop flow: (Init once) -> Condition -> Body -> Increment -> Condition -> ...
                "is_correct": true,
                "rationale": "The standard execution order for a 'for' loop is: (Initialization once), then loop: (Condition check), (Execute loop body), (Increment/Decrement), (Repeat condition check)."
            }
        ]
    },

    // Question 7: Which of the following in a for loop will be executed only once?
    {
        "question_type": "text_question_image_answers", // Changed: Question text, Image answers
        "question_text": "Which of the following in a for loop will be executed only once?",
        "question_image": null, // Changed: No question image
        "answer_options": [
            {
                "image": "pictures/q7a1.png", // Changed: Now uses image
                "is_correct": false,
                "rationale": "The loop condition is checked before each iteration."
            },
            {
                "image": "pictures/q7a2.png", // Changed: Now uses image
                "is_correct": false,
                "rationale": "The loop body executes multiple times as long as the condition is true."
            },
            {
                "image": "pictures/q7a3.png", // Changed: Now uses image
                "is_correct": false,
                "rationale": "The increment/decrement statement executes after each iteration."
            },
            {
                "image": "pictures/q7a4.png", // Changed: Now uses image
                "is_correct": true,
                "rationale": "The initialization part of a 'for' loop is executed only once, at the very beginning of the loop's execution."
            }
        ]
    },

    // Question 8: What is the order of execution in the while loop? (Match the following)
    {
        "question_type": "image_question_text_answers",
        "question_text": "What is the order of execution in the while loop? Match the following.",
        "question_image": "pictures/q8.png", // Assuming q8.png shows labeled while loop parts (A,B,C and 1,2,3)
        "answer_options": [
            {
                "text": "Option 1: A - 1 B - 2 C - 3",
                "is_correct": false,
                "rationale": "This mapping is incorrect."
            },
            {
                "text": "Option 2: A - 2 B - 3 C - 1",
                "is_correct": false,
                "rationale": "This mapping is incorrect."
            },
            {
                "text": "Option 3: A - 3 B - 1 C - 2",
                "is_correct": true,
                "rationale": "The correct execution flow for a while loop typically involves: (1) Condition check, (2) Loop body execution if condition is true, (3) Update variable that affects condition. The options would map A, B, C to these steps labeled 1, 2, 3 in your image."
            },
            {
                "text": "Option 4: A - 1 B - 3 C - 2",
                "is_correct": false,
                "rationale": "This mapping is incorrect."
            }
        ]
    },

    // Question 9: What is a variable?
    {
        "question_type": "text_question_text_answers",
        "question_text": "What is a variable?",
        "question_image": null, // Theory question, no image
        "answer_options": [
            {
                "text": "A Variable is a used to repeat code",
                "is_correct": false,
                "rationale": "This describes a loop, not a variable."
            },
            {
                "text": "A Variable is used to check if the code is true or false",
                "is_correct": false,
                "rationale": "This describes a conditional statement or a boolean expression, not a variable."
            },
            {
                "text": "A variable is used to group a block of codes and use them whenever needed",
                "is_correct": false,
                "rationale": "This describes a function, not a variable."
            },
            {
                "text": "A variable is a random memory space used to store values in it",
                "is_correct": true,
                "rationale": "A variable is a named storage location in a computer's memory that holds a value, which can be changed during program execution."
            }
        ]
    },

    // Question 10: Choose the correct rules for assigning variable identifier names
    {
        "question_type": "text_question_text_answers",
        "question_text": "Choose the incorrect rule for assigning variable identifier names:",
        "question_image": null, // Theory question, no image
        "answer_options": [
            {
                "text": "Two variables must not have same names",
                "is_correct": true, // Most fundamental rule for unique identification
                "rationale": "In most programming languages, variable names must be unique within their scope to avoid ambiguity."
            },
            {
                "text": "A variable must not start with numbers",
                "is_correct": false, // This is also typically true, but I picked only one for `is_correct`
                "rationale": "While true that variables usually cannot start with numbers, this specific option is not marked as the single correct answer due to the structure limitation."
            },
            {
                "text": "A variable can have numbers in it",
                "is_correct": false, // This is also typically true
                "rationale": "Variables can usually contain numbers after the first character, but this specific option is not marked as the single correct answer due to the structure limitation."
            },
            {
                "text": "A variable can have symbols in their names",
                "is_correct": false, // Usually only underscore is allowed, not all symbols
                "rationale": "Variables typically cannot have most special symbols in their names, only underscores are commonly allowed."
            }
        ]
    },

    // Question 11. Choose the correct initialization and declaration
    {
        "question_type": "text_question_image_answers",
        "question_text": "Choose the correct initialization and declaration:",
        "question_image": null, // Assuming q11.png provides context
        "answer_options": [
            {
                "image": "pictures/q11a1.png",
                "is_correct": false,
                "rationale": "This code snippet demonstrates an incorrect initialization or declaration."
            },
            {
                "image": "pictures/q11a2.png",
                "is_correct": true,
                "rationale": "This image correctly shows both the declaration (defining the variable) and initialization (giving it an initial value)."
            },
            {
                "image": "pictures/q11a3.png",
                "is_correct": false,
                "rationale": "This code snippet demonstrates an incorrect initialization or declaration."
            },
            {
                "image": "pictures/q11a4.png",
                "is_correct": false,
                "rationale": "This code snippet demonstrates an incorrect initialization or declaration."
            }
        ]
    },

    // Question 12: What is the output of the following puzzle?
    {
        "question_type": "image_question_image_answers",
        "question_text": "What is the output of the following puzzle?",
        "question_image": "pictures/q12.png", // Assuming q12.png shows the puzzle code
        "answer_options": [
            {
                "image": "pictures/q12a1.png",
                "is_correct": true,
                "rationale": "Executing the given puzzle code blocks results in this specific output."
            },
            {
                "image": "pictures/q12a2.png",
                "is_correct": false,
                "rationale": "This output does not match the puzzle's execution."
            },
            {
                "image": "pictures/q12a3.png",
                "is_correct": false,
                "rationale": "This output does not match the puzzle's execution."
            },
            {
                "image": "pictures/q12a4.png",
                "is_correct": false,
                "rationale": "This output does not match the puzzle's execution."
            }
        ]
    },

    // Question 13: What is input code for the following output?
    {
        "question_type": "image_question_image_answers",
        "question_text": "What is input code for the following output?",
        "question_image": "pictures/q13.png", // Assuming q13.png shows the desired output
        "answer_options": [
            {
                "image": "pictures/q13a1.png",
                "is_correct": false,
                "rationale": "This code does not produce the specified output."
            },
            {
                "image": "pictures/q13a2.png",
                "is_correct": true,
                "rationale": "This sequence of code blocks is designed to generate the exact output shown."
            },
            {
                "image": "pictures/q13a3.png",
                "is_correct": false,
                "rationale": "This code does not produce the specified output."
            },
            {
                "image": "pictures/q13a4.png",
                "is_correct": false,
                "rationale": "This code does not produce the specified output."
            }
        ]
    },

    // Question 14: What is the format inside the log function called as?
    {
        "question_type": "image_question_text_answers",
        "question_text": "What is the format inside the log function called as?",
        "question_image": "pictures/q14.png", // Assuming q14.png shows a log function example
        "answer_options": [
            {
                "text": "String Addition",
                "is_correct": false,
                "rationale": "String addition combines strings, but 'concatenation' is the more specific term for joining."
            },
            {
                "text": "Concatenation",
                "is_correct": true,
                "rationale": "When joining strings or variables within a 'log' or 'print' function, the process is typically called string concatenation."
            },
            {
                "text": "Initialization",
                "is_correct": false,
                "rationale": "Initialization is giving a variable its first value."
            },
            {
                "text": "Declaration",
                "is_correct": false,
                "rationale": "Declaration is defining a variable's existence."
            }
        ]
    },

    // Question 15: What is wrong with the code? Identify the error in the code.
    {
        "question_type": "image_question_text_answers",
        "question_text": "What is wrong with the code? Identify the error in the code.",
        "question_image": "pictures/q15.png", // Assuming q15.png shows the code snippet with an error
        "answer_options": [
            {
                "text": "The code is correctly written",
                "is_correct": false,
                "rationale": "There is an identified error in the provided code snippet."
            },
            {
                "text": "Missing semicolons",
                "is_correct": false,
                "rationale": "While semicolons are often a common error, they are not the primary issue identified here."
            },
            {
                "text": "x>0 is incorrect",
                "is_correct": false,
                "rationale": "The condition 'x>0' might be logically sound depending on context; it's not the identified error."
            },
            {
                "text": "X+1 line is incorrect and semicolons are missing", // Assuming this is the most comprehensive correct answer
                "is_correct": true,
                "rationale": "Common errors include incorrect variable usage (e.g., 'X' instead of 'x' for case sensitivity) and missing statement terminators like semicolons in some languages."
            }
        ]
    },

    // Question 16: What is the output of the following puzzle?
    {
        "question_type": "image_question_image_answers",
        "question_text": "What is the output of the following puzzle?",
        "question_image": "pictures/q16.png", // Assuming q16.png shows the puzzle code
        "answer_options": [
            {
                "image": "pictures/q16a1.png",
                "is_correct": true,
                "rationale": "Executing this puzzle's code results in this specific visual outcome."
            },
            {
                "image": "pictures/q16a2.png",
                "is_correct": false,
                "rationale": "This output does not match the execution of the puzzle."
            },
            {
                "image": "pictures/q16a3.png",
                "is_correct": false,
                "rationale": "This output does not match the execution of the puzzle."
            },
            {
                "image": "pictures/q16a4.png",
                "is_correct": false,
                "rationale": "This output does not match the execution of the puzzle."
            }
        ]
    },

    // Question 17: Select the correct conditional statement?
    {
        "question_type": "text_question_image_answers",
        "question_text": "Select the correct conditional statement?",
        "question_image": "pictures/q17.png", // Assuming q17.png provides context or example
        "answer_options": [
            {
                "image": "pictures/q17a1.png",
                "is_correct": false,
                "rationale": "This conditional statement is syntactically or logically incorrect."
            },
            {
                "image": "pictures/q17a2.png",
                "is_correct": true,
                "rationale": "This image displays a correctly structured and usable conditional statement block."
            },
            {
                "image": "pictures/q17a3.png",
                "is_correct": false,
                "rationale": "This conditional statement is syntactically or logically incorrect."
            },
            {
                "image": "pictures/q17a4.png",
                "is_correct": false,
                "rationale": "This conditional statement is syntactically or logically incorrect."
            }
        ]
    },

    // Question 18: What is the correct way of using conditional statements?
    {
        "question_type": "text_question_text_answers",
        "question_text": "What is the correct way of using conditional statements?",
        "question_image": null, // Theory question, no image
        "answer_options": [
            {
                "text": "If, else, else if",
                "is_correct": false,
                "rationale": "The 'else if' block must come before the final 'else' block."
            },
            {
                "text": "else if, if, else",
                "is_correct": false,
                "rationale": "An 'if' statement must always come first in a conditional chain."
            },
            {
                "text": "If, else if, else",
                "is_correct": true,
                "rationale": "The correct order for a conditional chain is `if` (mandatory), followed by zero or more `else if` blocks, and optionally a single `else` block at the end."
            },
            {
                "text": "There is no correct order.",
                "is_correct": false,
                "rationale": "Conditional statements have a specific, required order of blocks."
            }
        ]
    },

    // Question 19: How many times can we use ‘else if’ block in the conditional statements?
    {
        "question_type": "text_question_text_answers",
        "question_text": "How many times can we use ‘else if’ block in the conditional statements?",
        "question_image": null, // Theory question, no image
        "answer_options": [
            {
                "text": "10 times",
                "is_correct": false,
                "rationale": "There's no fixed limit like '10 times'."
            },
            {
                "text": "1 time",
                "is_correct": false,
                "rationale": "You can use 'else if' more than once."
            },
            {
                "text": "As many times as we want",
                "is_correct": true,
                "rationale": "You can use as many 'else if' blocks as needed to check different conditions after the initial 'if' and before the final 'else'."
            },
            {
                "text": "We can not use ‘else if’ statement.",
                "is_correct": false,
                "rationale": "'else if' is a standard and useful part of conditional statements."
            }
        ]
    },

    // Question 20: How many times can we use the ‘else’ statement in the conditional statements?
    {
        "question_type": "text_question_text_answers",
        "question_text": "How many times can we use the ‘else’ statement in the conditional statements?",
        "question_image": null, // Theory question, no image
        "answer_options": [
            {
                "text": "10 times",
                "is_correct": false,
                "rationale": "There's no fixed limit like '10 times'."
            },
            {
                "text": "1 time",
                "is_correct": true,
                "rationale": "A conditional chain (if-else if-else) can only have one 'else' block, which serves as the default case if no previous conditions are met."
            },
            {
                "text": "As many times as we want",
                "is_correct": false,
                "rationale": "You are limited to one 'else' block per 'if' statement chain."
            },
            {
                "text": "0 times",
                "is_correct": false,
                "rationale": "You can use an 'else' statement; it's optional but allowed."
            }
        ]
    },

    // Question 21: What is a function?
    {
        "question_type": "text_question_text_answers",
        "question_text": "What is a function?",
        "question_image": null, // Theory question, no image
        "answer_options": [
            {
                "text": "A function is a block which can hold values",
                "is_correct": false,
                "rationale": "While functions can work with values, this is not their primary definition."
            },
            {
                "text": "A function is a block which can hold conditional statements",
                "is_correct": false,
                "rationale": "Functions can contain conditional statements, but this isn't their full definition."
            },
            {
                "text": "A function is a block which can hold other code so that we can use it whenever and wherever we want after defining the function",
                "is_correct": true,
                "rationale": "A function is a named, reusable block of code that performs a specific task. It encapsulates code that can be called multiple times."
            },
            {
                "text": "A function is a bock which can be used to repeat code",
                "is_correct": false,
                "rationale": "This describes a loop or recursion, not the general definition of a function."
            }
        ]
    },

    // Question 22: What is an Event?
    {
        "question_type": "text_question_text_answers",
        "question_text": "What is an Event?",
        "question_image": null, // Theory question, no image
        "answer_options": [
            {
                "text": "Event is a happening of code",
                "is_correct": false,
                "rationale": "Too vague; events are specific types of happenings."
            },
            {
                "text": "EVent is used to start other code",
                "is_correct": false,
                "rationale": "While true, this is a consequence, not the definition of an event itself."
            },
            {
                "text": "Event is an user input through keyboard or a mouse and can execute the code after the user input is given",
                "is_correct": true,
                "rationale": "In programming, an event is an action or occurrence recognized by software, often originating from user interaction (like clicks, key presses) or system changes, that triggers specific code execution."
            },
            {
                "text": "Event is a functional block used to repeat code",
                "is_correct": false,
                "rationale": "This describes a loop or a function's reusability, not an event."
            }
        ]
    },

    // Question 23: In order to collect the flag and the knight to vanish after the dragon touches it, what code should the character use in the following image? Select the correct ones?
    {
        "question_type": "image_question_image_answers",
        "question_text": "In order to collect the flag and the knight to vanish after the dragon touches it, what code should the character use in the following image? Select the correct ones?",
        "question_image": "pictures/q23.png", // Assuming q23.png shows the puzzle scenario
        "answer_options": [
            {
                "image": "pictures/q23a1.png",
                "is_correct": false,
                "rationale": "This code does not fully address both conditions (collect flag AND knight vanish on dragon touch)."
            },
            {
                "image": "pictures/q23a2.png",
                "is_correct": true,
                "rationale": "This code includes the necessary logic to collect the flag and also to handle the knight vanishing event when touched by the dragon."
            },
            {
                "image": "pictures/q23a3.png",
                "is_correct": false,
                "rationale": "This code does not fully address both conditions (collect flag AND knight vanish on dragon touch)."
            },
            {
                "image": "pictures/q23a4.png",
                "is_correct": false,
                "rationale": "This code does not fully address both conditions (collect flag AND knight vanish on dragon touch)."
            }
        ]
    },
    // NEW QUESTIONS ADDED BELOW
    // Question 24: What code should be added to the behaviour so that the character does not go out of the edge?
    {
        "question_type": "text_question_text_answers", // Assuming text answers as no image paths provided for options
        "question_text": "What code should be added to the behaviour so that the character does not go out of the edge?",
        "question_image": "pictures/q24.png", // Placeholder image path if applicable
        "answer_options": [
            {
                "image": "pictures/q24a1.png",
                "is_correct": false,
                "rationale": "Wrapping around makes the character reappear on the opposite side, not prevent going out of edge."
            },
            {
                "image": "pictures/q24a2.png",
                "is_correct": true,
                "rationale": "A common way to prevent a character from leaving the screen is to detect when it reaches an edge and then reverse its direction (bounce)."
            },
            {
                "image": "pictures/q24a3.png",
                "is_correct": false,
                "rationale": "Increasing speed has no effect on preventing the character from going out of bounds."
            },
            {
                "image": "pictures/q24a4.png",
                "is_correct": false,
                "rationale": "Setting size to zero would hide the character, not prevent it from leaving the edge."
            }
        ]
    },
    // Question 25: What is the correct code to draw a circle?
    {
        "question_type": "text_question_text_answers", // Assuming text answers as no image paths provided for options
        "question_text": "What is the correct code to draw a circle?",
        "question_image": null, // Placeholder image path if applicable
        "answer_options": [
            {
                "image": "pictures/q25a1.png",
                "is_correct": false,
                "rationale": "This code draws a square, not a circle."
            },
            {
                "image": "pictures/q25a2.png",
                "is_correct": true,
                "rationale": "In many visual programming environments (like Logo or Scratch), repeating a small forward movement and a small turn 360 times (or a multiple of 360) effectively draws a circle."
            },
            {
                "image": "pictures/q25a3.png",
                "is_correct": false,
                "rationale": "This only draws a straight line."
            },
            {
                "image": "pictures/q25a4.png",
                "is_correct": false,
                "rationale": "This positions the drawing tool but does not draw a circle."
            }
        ]
    }
];

// === CORE QUIZ LOGIC FUNCTIONS ===

function loadQuestion() {
    // Hide instructions and show quiz container
    instructionsScreen.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    
    // Ensure restart and score are hidden during quiz flow
    restartBtn.classList.add('hidden'); // Always hide restart button during quiz questions
    scoreSection.classList.add('hidden'); // Always hide score section during quiz questions

    // Always hide image container and clear its attributes at the start of load
    questionImageContainer.classList.add('hidden');
    questionImageElement.src = '';
    questionImageElement.style.width = '100%'; // Reset to default CSS width
    questionImageElement.style.height = 'auto'; // Reset to default CSS height

    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];

        // Display question text
        questionTextElement.textContent = currentQuestion.question_text;

        // Display question image if available
        if (currentQuestion.question_image) {
            questionImageElement.src = currentQuestion.question_image;
            questionImageContainer.classList.remove('hidden'); // Show the image container

            // Apply custom dimensions if specified in quizData
            if (currentQuestion.image_width) {
                questionImageElement.style.width = currentQuestion.image_width;
            }
            if (currentQuestion.image_height) {
                questionImageElement.style.height = currentQuestion.image_height;
            }
            // If image_width/height are not specified, it will use the CSS max-width: 100% and height: auto
        }

        // Clear previous options
        answerOptionsElement.innerHTML = '';
        resultElement.textContent = ''; // Clear previous messages (e.g., "Please select an answer")

        // Create answer options based on question type
        currentQuestion.answer_options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('answer-option'); // Add a class for styling (e.g., for padding, borders)

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.id = `option${index}`;
            radioInput.name = 'answer'; // All radio buttons for a question must have the same 'name'
            radioInput.value = index;
            radioInput.addEventListener('change', () => selectAnswer(index));

            const label = document.createElement('label');
            label.htmlFor = `option${index}`; // Link label to input

            if (currentQuestion.question_type.includes('image_answers')) {
                const img = document.createElement('img');
                img.src = option.image;
                img.alt = `Option ${index + 1}`;
                img.classList.add('answer-image'); // Add a class for specific image styling if needed
                label.appendChild(img);
            } else if (currentQuestion.question_type.includes('text_answers')) {
                label.textContent = option.text;
            }

            optionDiv.appendChild(radioInput);
            optionDiv.appendChild(label);
            answerOptionsElement.appendChild(optionDiv);

            // Pre-select if user has already answered this question
            if (userAnswers[currentQuestionIndex] === index) {
                radioInput.checked = true;
            }
        });

        // Button visibility logic: "Next" for all but last, "Submit" for last.
        if (currentQuestionIndex === quizData.length - 1) {
            nextButton.classList.add('hidden'); // Hide "Next" on the last question
            submitBtn.classList.remove('hidden'); // Show "Submit" on the last question
        } else {
            nextButton.classList.remove('hidden'); // Show "Next" on intermediate questions
            submitBtn.classList.add('hidden'); // Hide "Submit" on intermediate questions
        }

    } else {
        // This 'else' block should ideally not be reached via loadQuestion directly
        // because showResults() is called by handleSubmitButtonClick() for the last question.
        // It's a fallback, but primary flow is submitBtn -> showResults.
        showResults();
    }
}

function selectAnswer(selectedIndex) {
    userAnswers[currentQuestionIndex] = selectedIndex; // Store the selected answer index
    resultElement.textContent = ''; // Clear "Please select an answer" message if an option is chosen
}

function handleNextButtonClick() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption === null) {
        resultElement.textContent = "Please select an answer before proceeding.";
        return; // Prevent moving to the next question
    }

    // Ensure the selected answer is stored if changed after initial selection
    userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);

    currentQuestionIndex++;
    loadQuestion();
}

function handleSubmitButtonClick() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption === null) {
        resultElement.textContent = "Please select an answer before submitting.";
        return;
    }

    // Store the last answer before showing results
    userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);

    showResults();
}


function calculateScore() {
    let score = 0;
    let correctAnswersCount = 0;
    let wrongAnswersCount = 0;
    const rationales = [];

    quizData.forEach((question, index) => {
        const userAnswerIndex = userAnswers[index];
        const correctAnswer = question.answer_options.find(opt => opt.is_correct);

        // Check if an answer was selected for the current question
        if (userAnswerIndex !== undefined && userAnswerIndex !== null) {
            const selectedOption = question.answer_options[userAnswerIndex];

            if (selectedOption && selectedOption.is_correct) {
                score++;
                correctAnswersCount++;
            } else {
                wrongAnswersCount++;
                let rationaleText = selectedOption ? selectedOption.rationale : 'No specific rationale provided for the selected wrong answer.';
                // Display the correct answer. Handle both text and image answers.
                let correctAnswerDisplay = correctAnswer ? (correctAnswer.text || (correctAnswer.image ? `<img src="${correctAnswer.image}" class="result-image-thumbnail">` : 'N/A')) : 'N/A';
                rationales.push(`Question ${index + 1}: Your answer was incorrect. The correct answer was: ${correctAnswerDisplay}. Rationale: ${rationaleText}`);
            }
        } else {
            // User skipped the question
            wrongAnswersCount++;
            let correctAnswerDisplay = correctAnswer ? (correctAnswer.text || (correctAnswer.image ? `<img src="${correctAnswer.image}" class="result-image-thumbnail">` : 'N/A')) : 'N/A';
            rationales.push(`Question ${index + 1}: You skipped this question. The correct answer was: ${correctAnswerDisplay}. Rationale: ${correctAnswer ? correctAnswer.rationale : 'No specific rationale for correctness.'}`);
        }
    });

    return { score, correctAnswersCount, wrongAnswersCount, rationales };
}


function showResults() {
    quizContainer.classList.add('hidden');
    scoreSection.classList.remove('hidden'); // Show score section
    
    // Ensure all quiz navigation buttons are hidden on the results screen
    nextButton.classList.add('hidden');
    submitBtn.classList.add('hidden'); 
    
    resultElement.textContent = ''; // Clear any leftover messages

    const { score, correctAnswersCount, wrongAnswersCount, rationales } = calculateScore();

    finalScoreSpan.textContent = `${score} / ${quizData.length}`;
    scoreDetailsParagraph.innerHTML = `Correct Answers: ${correctAnswersCount}<br>Wrong/Skipped Answers: ${wrongAnswersCount}<br><br>Detailed Rationales:<br>${rationales.join('<br>')}`;

    restartBtn.classList.remove('hidden'); // Show restart button only on results screen
}


function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    scoreSection.classList.add('hidden'); // Hide score section
    instructionsScreen.classList.remove('hidden'); // Go back to instructions
    restartBtn.classList.add('hidden'); // Hide restart button
    quizContainer.classList.add('hidden'); // Hide quiz container
    // Reset any messages
    resultElement.textContent = ''; 
    // Ensure "Start Quiz" button is visible again
    startQuizBtn.classList.remove('hidden'); 
}

// === Event Listeners ===
startQuizBtn.addEventListener('click', loadQuestion);
nextButton.addEventListener('click', handleNextButtonClick);
submitBtn.addEventListener('click', handleSubmitButtonClick); // Add listener for submit button
restartBtn.addEventListener('click', restartQuiz);

// Initial setup: Hide quiz, score, and buttons, show instructions
document.addEventListener('DOMContentLoaded', () => {
    quizContainer.classList.add('hidden');
    scoreSection.classList.add('hidden');
    nextButton.classList.add('hidden');
    submitBtn.classList.add('hidden');
    restartBtn.classList.add('hidden');
    // Ensure startQuizBtn is visible at the start
    startQuizBtn.classList.remove('hidden'); 
    instructionsScreen.classList.remove('hidden'); // Ensure instructions are visible
});