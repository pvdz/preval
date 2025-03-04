# Preval test case

# while2.md

> Normalize > Dce > Break > While2
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
  $('keep');
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
  $(`keep`);
}
$(`after, do not evaluate (infinite loop)`);
`````

## Normalized


`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    while (true) {
      const tmpIfTest$1 = $(true);
      if (tmpIfTest$1) {
        break;
      } else {
        break;
      }
    }
    $(`keep`);
  } else {
    break;
  }
}
$(`after, do not evaluate (infinite loop)`);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(true);
    $(`keep`);
    const tmpIfTest$1 /*:unknown*/ = $(true);
    if (tmpIfTest$1) {
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
  while ($LOOP_UNROLL_10) {
    $( true );
    $( "keep" );
    const b = $( true );
    if (b) {

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
 - 3: 'keep'
 - 4: true
 - 5: true
 - 6: 'keep'
 - 7: true
 - 8: true
 - 9: 'keep'
 - 10: true
 - 11: true
 - 12: 'keep'
 - 13: true
 - 14: true
 - 15: 'keep'
 - 16: true
 - 17: true
 - 18: 'keep'
 - 19: true
 - 20: true
 - 21: 'keep'
 - 22: true
 - 23: true
 - 24: 'keep'
 - 25: true
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
