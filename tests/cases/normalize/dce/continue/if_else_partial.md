# Preval test case

# if_else_partial.md

> Normalize > Dce > Continue > If else partial
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
while ($(true)) {
  if ($(1)) {
    continue;
    $('fail');
  }
  $('keep, do not eval');
}
$('after, wont eval due to infinite loop');
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(1);
  if (tmpIfTest$1) {
  } else {
    $(`keep, do not eval`);
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(true);
    if (tmpIfTest$2) {
      const tmpIfTest$4 /*:unknown*/ = $(1);
      if (tmpIfTest$4) {
      } else {
        $(`keep, do not eval`);
      }
    } else {
      break;
    }
  }
} else {
}
$(`after, wont eval due to infinite loop`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  if (!$(1)) {
    $(`keep, do not eval`);
  }
  while (true) {
    if ($(true)) {
      if (!$(1)) {
        $(`keep, do not eval`);
      }
    } else {
      break;
    }
  }
}
$(`after, wont eval due to infinite loop`);
`````

## Pre Normal


`````js filename=intro
while ($(true)) {
  $continue: {
    {
      if ($(1)) {
        break $continue;
        $(`fail`);
      }
      $(`keep, do not eval`);
    }
  }
}
$(`after, wont eval due to infinite loop`);
`````

## Normalized


`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $continue: {
      const tmpIfTest$1 = $(1);
      if (tmpIfTest$1) {
        break $continue;
      } else {
        $(`keep, do not eval`);
      }
    }
  } else {
    break;
  }
}
$(`after, wont eval due to infinite loop`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( 1 );
  if (b) {

  }
  else {
    $( "keep, do not eval" );
  }
  while ($LOOP_UNROLL_10) {
    const c = $( true );
    if (c) {
      const d = $( 1 );
      if (d) {

      }
      else {
        $( "keep, do not eval" );
      }
    }
    else {
      break;
    }
  }
}
$( "after, wont eval due to infinite loop" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 1
 - 3: true
 - 4: 1
 - 5: true
 - 6: 1
 - 7: true
 - 8: 1
 - 9: true
 - 10: 1
 - 11: true
 - 12: 1
 - 13: true
 - 14: 1
 - 15: true
 - 16: 1
 - 17: true
 - 18: 1
 - 19: true
 - 20: 1
 - 21: true
 - 22: 1
 - 23: true
 - 24: 1
 - 25: true
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
