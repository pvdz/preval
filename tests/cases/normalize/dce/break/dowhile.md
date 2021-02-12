# Preval test case

# base.md

> normalize > dce > base
>
> Any statements that follow a return in the same parent should be eliminated.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  do {
    break;
    $('fail');
  } while ($(true));
}
$('after, do not evaluate (infinite loop)');
`````

## Normalized

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let tmpDoWhileFlag = true;
    while (true) {
      let tmpIfTest$1 = tmpDoWhileFlag;
      if (tmpIfTest$1) {
      } else {
        tmpIfTest$1 = $(true);
      }
      if (tmpIfTest$1) {
        tmpDoWhileFlag = false;
        break;
      } else {
        break;
      }
    }
  } else {
    break;
  }
}
$('after, do not evaluate (infinite loop)');
`````

## Output

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let tmpDoWhileFlag = true;
    while (true) {
      let tmpIfTest$1 = tmpDoWhileFlag;
      if (tmpIfTest$1) {
      } else {
        tmpIfTest$1 = $(true);
      }
      if (tmpIfTest$1) {
        tmpDoWhileFlag = false;
        break;
      } else {
        break;
      }
    }
  } else {
    break;
  }
}
$('after, do not evaluate (infinite loop)');
`````

## Result

Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - 4: true
 - 5: true
 - 6: true
 - 7: true
 - 8: true
 - 9: true
 - 10: true
 - 11: true
 - 12: true
 - 13: true
 - 14: true
 - 15: true
 - 16: true
 - 17: true
 - 18: true
 - 19: true
 - 20: true
 - 21: true
 - 22: true
 - 23: true
 - 24: true
 - 25: true
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
