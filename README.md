# BGU-MF
Ben-Gurion University- Math Fluency Test.

Code for short and reliable computerized math fluency test.

**General description:**

The BGU-MF test is a computerized math fluency test. The test includes simple math exercises of the four operations: addition, subtraction, multiplication, and division. Exercises in addition and subtraction used numbers between 0 and 20 (e.g., 7 + 6). Multiplication and division exercises were taken from the multiplication table (up to 10 X 10; e.g., 56 ÷ 7). The exercises appeared one by one on the screen, and participants instructed to key in their answers, see example. The presented exercise selected randomly from a pool of math facts (a total of 900 options: 440 addition exercises, 230 subtraction exercises, 120 multiplication exercises and 110 division exercises). In each trial, one exercise presented and participants instructed to type their answers inside a square and press the enter key in order to proceed to the next trial. The typed answer presented on the screen. The length of the test was 180 seconds. For each participant, the number of solved exercises recorded. In each trial, the accuracy and reaction times (RT) per exercise recorded. Reaction times calculated from the beginning of the trial until the key press of the first digit in the answer. At the end of the test, a message of completion of the test appeared on the screen. The output for the performance includes a table with a line for each trial with the following details: the exercise that appeared, the participant’s response, accuracy (whether the participant’s response was correct or nor) and the response time per specific exercise. In addition, a summary of the total number of solved exercises accuracy (percent correct) per operation is presented, and average RT (for correct responses) per operation. 


**Instructions for using the BGU-MF test**

Use this link - https://yardengliksman.github.io/BGU-MF/

**Adjustment of the BGU-MF test-**  
You may adjust the BGU-MF per session, regarding the operations and the difficulty level of the exercises that will include in the session. Additionally, you can adjust whether the operator zero will include.
The parameters to adjust:
Parameter     |	Shortcut in Code    |Levels                                                              |Defaults|
--------------|---------------------|--------------------------------------------------------------------|--------|
Addition      |	add	            |0: without; 1: exercises up to 10; 2: exercises up to 20            |  2     |
Subtraction   |	sub	            |0: without; 1: exercises up to 10; 2: exercises up to 20            |  2     |
Multiplication|	mult                |0: without; 1: exercises up to 5 X 5; 2: exercises up to 10 X 10    |  2     |
Division      | div	            |0: without; 1: exercises up to 5 X 5;2: exercises up to 10 X 10	 |  2     |
Zero          | Zeros                |0: without; 1: include                                              |  1     |
Timer	      | timer	            |Length of the session	                                         |180 sec |

In order to adjust these parameters, after the participant nickname, add the sign "&" and the shortcut of the parameter. Then, add the number of difficulty level.

Template-
- https://yardengliksman.github.io/BGU-MF/?add=[level]&sub=[level]&mult=[level]&div=[level]&zeros=[level].

There no need to write [], just the relevant values.

**Example-** 
- https://yardengliksman.github.io/BGU-MF/?add=2&sub=2&mult=1&div=0&zeros=1. 
In the presents example, the session for participant 1 will include addition and subtraction exercises up to 20, multiplication exercises up to 5 X 5, and with no division exercises. The exercises will include the operator zero (e.g., 4 X 0). 

**Output-**
The output per participant included these following variables – 
-	the serial number of presented exercise.
-	Problem – The exercise presented in the trial.
-	Participant response – Participants’ answer.
-	Correct response – whether the answer was correct (yesy - line mark in green) or incorrect (no - line mark in red).
-	Time to enter first digit (either one of one or one of two digits) – The time that pass between the time the exercise appeared until the time that the participant enters his first digit (in milliseconds).
-	Time to complete response (i.e. time to click enter) - The time that pass between the time the exercise appeared until the time that the participant clicks enter button (in second).

-	Type of exercise – The operation of the exercise.
- Number of correct responses out of total number of exercise of this type.
- Mean response time (for correct responses) - per operation

Example for the default version of the test can be found here: yardengliksman.github.io/BGU-MF/

**Instructions for participants:** "answer as accurately and quickly as possible".

**Citation:**

Gliksman, Y., Berebbi, S., Hershman, R., & Henik, A. (2020). BGU-MF: Ben-Gurion University Math Fluency Test. Manuscript under review.
