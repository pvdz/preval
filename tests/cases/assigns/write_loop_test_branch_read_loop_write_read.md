# Preval test case

# write_loop_test_branch_read_loop_write_read.md

> Assigns > Write loop test branch read loop write read
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
let x = $(10);
while ($(x)) {
  if ($(true)) $(x); // This read can not reach the second write but is still in same loop
  x = $(20);
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = $(10);
while ($(x)) {
  if ($(true)) $(x);
  x = $(20);
}
$(x);
`````

## Normalized

`````js filename=intro
let x = $(10);
let tmpIfTest = $(x);
while (tmpIfTest) {
  const tmpIfTest$1 = $(true);
  if (tmpIfTest$1) {
    $(x);
  } else {
  }
  x = $(20);
  tmpIfTest = $(x);
}
$(x);
`````

## Output

`````js filename=intro
let x = $(10);
let tmpIfTest = $(x);
while (tmpIfTest) {
  const tmpIfTest$1 = $(true);
  if (tmpIfTest$1) {
    $(x);
  } else {
  }
  x = $(20);
  tmpIfTest = $(x);
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - 3: true
 - 4: 10
 - 5: 20
 - 6: 20
 - 7: true
 - 8: 20
 - 9: 20
 - 10: 20
 - 11: true
 - 12: 20
 - 13: 20
 - 14: 20
 - 15: true
 - 16: 20
 - 17: 20
 - 18: 20
 - 19: true
 - 20: 20
 - 21: 20
 - 22: 20
 - 23: true
 - 24: 20
 - 25: 20
 - 26: 20
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
