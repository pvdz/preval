# Preval test case

# write_loop_write_nested_loop_read_read.md

> Assigns > Write loop write nested loop read read
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
let x = $(10);
while ($(true)) {
  x = $(20, 'set');
  while ($(true)) {
    $(x, 'loop');
  }
  $(x);
}
`````

## Pre Normal

`````js filename=intro
let x = $(10);
while ($(true)) {
  x = $(20, 'set');
  while ($(true)) {
    $(x, 'loop');
  }
  $(x);
}
`````

## Normalized

`````js filename=intro
let x = $(10);
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    x = $(20, 'set');
    while (true) {
      const tmpIfTest$1 = $(true);
      if (tmpIfTest$1) {
        $(x, 'loop');
      } else {
        break;
      }
    }
    $(x);
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
$(10);
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpSSA_x = $(20, 'set');
    while (true) {
      const tmpIfTest$1 = $(true);
      if (tmpIfTest$1) {
        $(tmpSSA_x, 'loop');
      } else {
        break;
      }
    }
    $(tmpSSA_x);
  } else {
    break;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: true
 - 3: 20, 'set'
 - 4: true
 - 5: 20, 'loop'
 - 6: true
 - 7: 20, 'loop'
 - 8: true
 - 9: 20, 'loop'
 - 10: true
 - 11: 20, 'loop'
 - 12: true
 - 13: 20, 'loop'
 - 14: true
 - 15: 20, 'loop'
 - 16: true
 - 17: 20, 'loop'
 - 18: true
 - 19: 20, 'loop'
 - 20: true
 - 21: 20, 'loop'
 - 22: true
 - 23: 20, 'loop'
 - 24: true
 - 25: 20, 'loop'
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
