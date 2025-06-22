# Explanation 
### Code

```
  // Function to select a random student who hasn't answered yet
  const selectRandomStudent = () => {
    if (!batchStudents.length) return;

    // Filter out already answered students using student ID for more reliable comparison
    const unAnsweredStudents = batchStudents.filter(
      (student) => !answeredStudents.some((s) => s.id === student.id)
    );

    // If no students left to answer, end the session
    if (unAnsweredStudents.length === 0) {
      setSessionFinished(true);
      setSessionStarted(false);
      return;
    }

    // Randomly select a student who hasn't answered yet
    const randomIndex = Math.floor(Math.random() * unAnsweredStudents.length);
    const randomStudent = unAnsweredStudents[randomIndex];

    setCurrentStudent(randomStudent);
  };
```
 ## ``` selectRandomStudent``` Function 
 This function is responsible for selecting a random student from the current batch who hasn't answered any questions yet. Here's a detailed breakdown:

###
<h3 style="text-align:center; color:green">  1. Function Purpose</h3>

```
const selectRandomStudent = () => {
```

This function selects a random student who hasn't participated yet, ensuring fair participation in the session.

### 
 <h3 style="text-align:center; color:green"> 2. Early Exit if No Students</h3>

```

if (!batchStudents.length) return;
```
* Checks if there are any students in the current batch

* Returns immediately if the batch is empty (defensive programming)
###
<h3 style="text-align:center; color:green"> 3. Filtering Unanswered Students </h3>

```
const unAnsweredStudents = batchStudents.filter(
  (student) => !answeredStudents.some((s) => s.id === student.id)
);
```
* Takes the full list of batch students

* Filters out any students who are already in the answeredStudents array

* Uses student id for comparison (more reliable than names)

* Creates a new array containing only students who haven't answered

### 
<h3 style="text-align:center; color:green"> 4. Session Completion Check </h3>

```
if (unAnsweredStudents.length === 0) {
  setSessionFinished(true);
  setSessionStarted(false);
  return;
}
```
* Checks if there are no un-answered students left

* If true:

* * Marks session as finished (setSessionFinished(true))

* * Stops the active session (setSessionStarted(false))

* * Exits the function early

### 
<h3 style="text-align:center; color:green">5. Random Student Selection  </h3>

```
const randomIndex = Math.floor(Math.random() * unAnsweredStudents.length);
const randomStudent = unAnsweredStudents[randomIndex];
```
* Generates a random index between 0 and length of un-answered students

* Math.random() generates a number between 0 (inclusive) and 1 (exclusive)

* Math.floor() rounds down to the nearest integer

* Selects the student at that random index

### 
<h3 style="text-align:center; color:green"> 6. Updating Current Student</h3>

```
setCurrentStudent(randomStudent);
```
* Sets the selected random student as the current active student

* Triggers React's state update and re-render

#### 
<h4 style="text-align:center; color:pink"> Key Features</h4>

1. Fair Selection: Only picks from students who haven't answered

2. Id-Based Comparison: Uses student IDs instead of names to avoid duplicates

3. Automatic Session End: Handles completion when all students have answered

4. Defensive Programming: Handles empty batches gracefully

#### 
<h4 style="text-align:center; color:pink"> Example Flow</h4>

1. Batch has students: Alice(id:1), Bob(id:2), Charlie(id:3)

2. Alice has answered (in answeredStudents array)

3. Function filters to [Bob, Charlie]

4. Randomly selects one (e.g., Charlie)

5. Sets Charlie as current student

* * This ensures every student gets a turn before any repeats occur.
