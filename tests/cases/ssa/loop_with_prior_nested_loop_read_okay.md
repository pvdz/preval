# Preval test case

# loop_with_prior_nested_loop_read_okay.md

> Ssa > Loop with prior nested loop read okay
>
> Assignments in loops won't easily be SSA'd

#TODO

## Input

`````js filename=intro
function f() {
  while (true) {
    let x = $(1);
    $(x); // This should not prevent the SSA of the inner loop
    while (true) {
      x = $(2);
      $(x);
    }
  }
}
if ($) f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    let x = $(1);
    $(x);
    while (true) {
      x = $(2);
      $(x);
    }
  }
};
if ($) f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    let x = $(1);
    $(x);
    while (true) {
      x = $(2);
      $(x);
    }
  }
  return undefined;
};
if ($) {
  f();
} else {
}
`````

## Output

`````js filename=intro
if ($) {
  while (true) {
    let x = $(1);
    $(x);
    while (true) {
      x = $(2);
      $(x);
    }
  }
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 2
 - 9: 2
 - 10: 2
 - 11: 2
 - 12: 2
 - 13: 2
 - 14: 2
 - 15: 2
 - 16: 2
 - 17: 2
 - 18: 2
 - 19: 2
 - 20: 2
 - 21: 2
 - 22: 2
 - 23: 2
 - 24: 2
 - 25: 2
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
