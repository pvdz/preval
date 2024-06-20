# Preval test case

# write_loop_read.md

> Assigns > Write loop read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
let x = $(10);
while ($(true)) {
  $(x, 'loop');
}
`````

## Pre Normal


`````js filename=intro
let x = $(10);
while ($(true)) {
  $(x, `loop`);
}
`````

## Normalized


`````js filename=intro
let x = $(10);
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(x, `loop`);
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
const x = $(10);
const tmpIfTest = $(true);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(x, `loop`);
    const tmpIfTest$1 = $(true);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
const b = $( true );
if (b) {
  while ($LOOP_UNROLL_10) {
    $( a, "loop" );
    const c = $( true );
    if (c) {

    }
    else {
      break;
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: true
 - 3: 10, 'loop'
 - 4: true
 - 5: 10, 'loop'
 - 6: true
 - 7: 10, 'loop'
 - 8: true
 - 9: 10, 'loop'
 - 10: true
 - 11: 10, 'loop'
 - 12: true
 - 13: 10, 'loop'
 - 14: true
 - 15: 10, 'loop'
 - 16: true
 - 17: 10, 'loop'
 - 18: true
 - 19: 10, 'loop'
 - 20: true
 - 21: 10, 'loop'
 - 22: true
 - 23: 10, 'loop'
 - 24: true
 - 25: 10, 'loop'
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
