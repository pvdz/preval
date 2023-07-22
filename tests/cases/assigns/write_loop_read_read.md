# Preval test case

# write_loop_read_read.md

> Assigns > Write loop read read
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
let x = $(10);
while ($(true)) {
  $(x, 'loop');
}
$(x, 'after');
`````

## Pre Normal

`````js filename=intro
let x = $(10);
while ($(true)) {
  $(x, `loop`);
}
$(x, `after`);
`````

## Normalized

`````js filename=intro
let x = $(10);
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    $(x, `loop`);
    tmpIfTest = $(true);
  } else {
    break;
  }
}
$(x, `after`);
`````

## Output

`````js filename=intro
const x = $(10);
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(x, `loop`);
  let tmpClusterSSA_tmpIfTest = $(true);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      $(x, `loop`);
      tmpClusterSSA_tmpIfTest = $(true);
    } else {
      break;
    }
  }
} else {
}
$(x, `after`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
const b = $( true );
if (b) {
  $( a, "loop" );
  let c = $( true );
  while ($LOOP_UNROLL_10) {
    if (c) {
      $( a, "loop" );
      c = $( true );
    }
    else {
      break;
    }
  }
}
$( a, "after" );
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
