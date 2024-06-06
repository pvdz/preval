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
while (true) {
  if (tmpIfTest) {
    const tmpIfTest$1 = $(true);
    if (tmpIfTest$1) {
      $(x);
    } else {
    }
    x = $(20);
    tmpIfTest = $(x);
  } else {
    break;
  }
}
$(x);
`````

## Output


`````js filename=intro
let x = $(10);
const tmpIfTest = $(x);
if (tmpIfTest) {
  const tmpIfTest$1 = $(true);
  if (tmpIfTest$1) {
    $(x);
  } else {
  }
  x = $(20);
  let tmpClusterSSA_tmpIfTest = $(x);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      const tmpIfTest$2 = $(true);
      if (tmpIfTest$2) {
        $(x);
      } else {
      }
      x = $(20);
      tmpClusterSSA_tmpIfTest = $(x);
    } else {
      break;
    }
  }
} else {
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 10 );
const b = $( a );
if (b) {
  const c = $( true );
  if (c) {
    $( a );
  }
  a = $( 20 );
  let d = $( a );
  while ($LOOP_UNROLL_10) {
    if (d) {
      const e = $( true );
      if (e) {
        $( a );
      }
      a = $( 20 );
      d = $( a );
    }
    else {
      break;
    }
  }
}
$( a );
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
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
