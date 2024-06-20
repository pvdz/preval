# Preval test case

# write_loop_write_nested_loop_read2.md

> Assigns > Write loop write nested loop read2
>
> Turning a var into a const. Or not.

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
while (true) {
  const tmpIfTest = $(`a`);
  if (tmpIfTest) {
    x = $(20, `set`);
    while (true) {
      const tmpIfTest$1 = $(`b`);
      if (tmpIfTest$1) {
        $(x, `loop`);
      } else {
        break;
      }
    }
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
$(10);
while (true) {
  const tmpIfTest = $(`a`);
  if (tmpIfTest) {
    const tmpClusterSSA_x = $(20, `set`);
    const tmpIfTest$1 = $(`b`);
    if (tmpIfTest$1) {
      while ($LOOP_UNROLL_10) {
        $(tmpClusterSSA_x, `loop`);
        const tmpIfTest$2 = $(`b`);
        if (tmpIfTest$2) {
        } else {
          break;
        }
      }
    } else {
    }
  } else {
    break;
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
$( 10 );
while (true) {
  const a = $( "a" );
  if (a) {
    const b = $( 20, "set" );
    const c = $( "b" );
    if (c) {
      while ($LOOP_UNROLL_10) {
        $( b, "loop" );
        const d = $( "b" );
        if (d) {

        }
        else {
          break;
        }
      }
    }
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
