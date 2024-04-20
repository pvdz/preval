# Preval test case

# write_loop_write_nested_loop_read2.md

> Assigns > Write loop write nested loop read2
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
let x = $(10);
while ($('a')) {
  x = $(20, 'set');
  while ($('b')) {
    $(x, 'loop');
  }
}
`````

## Pre Normal

`````js filename=intro
let x = $(10);
while ($(`a`)) {
  x = $(20, `set`);
  while ($(`b`)) {
    $(x, `loop`);
  }
}
`````

## Normalized

`````js filename=intro
let x = $(10);
let tmpIfTest = $(`a`);
while (true) {
  if (tmpIfTest) {
    x = $(20, `set`);
    let tmpIfTest$1 = $(`b`);
    while (true) {
      if (tmpIfTest$1) {
        $(x, `loop`);
        tmpIfTest$1 = $(`b`);
      } else {
        break;
      }
    }
    tmpIfTest = $(`a`);
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let x = $(10);
let tmpIfTest = $(`a`);
while (true) {
  if (tmpIfTest) {
    x = $(20, `set`);
    let tmpIfTest$1 = $(`b`);
    if (tmpIfTest$1) {
      $(x, `loop`);
      const tmpClusterSSA_tmpIfTest$1 = $(`b`);
      while ($LOOP_UNROLL_10) {
        if (tmpClusterSSA_tmpIfTest$1) {
          $(x, `loop`);
          tmpIfTest$1 = $(`b`);
        } else {
          break;
        }
      }
    } else {
    }
    tmpIfTest = $(`a`);
  } else {
    break;
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 10 );
let b = $( "a" );
while (true) {
  if (b) {
    a = $( 20, "set" );
    let c = $( "b" );
    if (c) {
      $( a, "loop" );
      const d = $( "b" );
      while ($LOOP_UNROLL_10) {
        if (d) {
          $( a, "loop" );
          c = $( "b" );
        }
        else {
          break;
        }
      }
    }
    b = $( "a" );
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
 - 1: 10
 - 2: 'a'
 - 3: 20, 'set'
 - 4: 'b'
 - 5: 20, 'loop'
 - 6: 'b'
 - 7: 20, 'loop'
 - 8: 'b'
 - 9: 20, 'loop'
 - 10: 'b'
 - 11: 20, 'loop'
 - 12: 'b'
 - 13: 20, 'loop'
 - 14: 'b'
 - 15: 20, 'loop'
 - 16: 'b'
 - 17: 20, 'loop'
 - 18: 'b'
 - 19: 20, 'loop'
 - 20: 'b'
 - 21: 20, 'loop'
 - 22: 'b'
 - 23: 20, 'loop'
 - 24: 'b'
 - 25: 20, 'loop'
 - 26: 'b'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
