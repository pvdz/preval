# Preval test case

# write_loop_read_nested_loop_read.md

> Assigns > Write loop read nested loop read
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
let x = $(1);
while ($(true)) {
  $(x, 'loop1');
  while ($(true)) {
    $(x, 'loop2');
  }
}
`````

## Pre Normal

`````js filename=intro
let x = $(1);
while ($(true)) {
  $(x, `loop1`);
  while ($(true)) {
    $(x, `loop2`);
  }
}
`````

## Normalized

`````js filename=intro
let x = $(1);
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    $(x, `loop1`);
    let tmpIfTest$1 = $(true);
    while (true) {
      if (tmpIfTest$1) {
        $(x, `loop2`);
        tmpIfTest$1 = $(true);
      } else {
        break;
      }
    }
    tmpIfTest = $(true);
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
const x = $(1);
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    $(x, `loop1`);
    let tmpIfTest$1 = $(true);
    if (tmpIfTest$1) {
      $(x, `loop2`);
      tmpIfTest$1 = $(true);
      while ($LOOP_UNROLL_10) {
        if (tmpIfTest$1) {
          $(x, `loop2`);
          tmpIfTest$1 = $(true);
        } else {
          break;
        }
      }
    } else {
    }
    tmpIfTest = $(true);
  } else {
    break;
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( true );
while (true) {
  if (b) {
    $( a, "loop1" );
    let c = $( true );
    if (c) {
      $( a, "loop2" );
      c = $( true );
      while ($LOOP_UNROLL_10) {
        if (c) {
          $( a, "loop2" );
          c = $( true );
        }
        else {
          break;
        }
      }
    }
    b = $( true );
  }
  else {
    break;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: true
 - 3: 1, 'loop1'
 - 4: true
 - 5: 1, 'loop2'
 - 6: true
 - 7: 1, 'loop2'
 - 8: true
 - 9: 1, 'loop2'
 - 10: true
 - 11: 1, 'loop2'
 - 12: true
 - 13: 1, 'loop2'
 - 14: true
 - 15: 1, 'loop2'
 - 16: true
 - 17: 1, 'loop2'
 - 18: true
 - 19: 1, 'loop2'
 - 20: true
 - 21: 1, 'loop2'
 - 22: true
 - 23: 1, 'loop2'
 - 24: true
 - 25: 1, 'loop2'
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
