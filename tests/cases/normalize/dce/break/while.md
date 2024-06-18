# Preval test case

# while.md

> Normalize > Dce > Break > While
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Input

`````js filename=intro
while ($(true)) {
  while ($(true)) {
    break;
    $('fail');
  }
}
$('after, do not evaluate (infinite loop)');
`````

## Pre Normal


`````js filename=intro
while ($(true)) {
  while ($(true)) {
    break;
    $(`fail`);
  }
}
$(`after, do not evaluate (infinite loop)`);
`````

## Normalized


`````js filename=intro
let tmpIfTest = $(true);
while (true) {
  if (tmpIfTest) {
    const tmpUnaryArg = $(true);
    let tmpIfTest$1 = !tmpUnaryArg;
    while (true) {
      if (tmpIfTest$1) {
        break;
      } else {
        break;
      }
    }
    tmpIfTest = $(true);
  } else {
    break;
  }
}
$(`after, do not evaluate (infinite loop)`);
`````

## Output


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(true);
  let tmpClusterSSA_tmpIfTest = $(true);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      $(true);
      tmpClusterSSA_tmpIfTest = $(true);
    } else {
      break;
    }
  }
} else {
}
$(`after, do not evaluate (infinite loop)`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( true );
  let b = $( true );
  while ($LOOP_UNROLL_10) {
    if (b) {
      $( true );
      b = $( true );
    }
    else {
      break;
    }
  }
}
$( "after, do not evaluate (infinite loop)" );
`````

## Globals

None

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
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
