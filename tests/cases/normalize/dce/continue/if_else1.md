# Preval test case

# if_else1.md

> Normalize > Dce > Continue > If else1
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
while ($(true)) {
  if ($(1)) {
    continue;
    $('fail');
  }
  else {
    continue;
    $('fail');
  }
  $('fail');
}
$('after, wont eval due to infinite loop');
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpIfTest$1 /*:unknown*/ = $(true);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
  $(`after, wont eval due to infinite loop`);
} else {
  $(`after, wont eval due to infinite loop`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  while (true) {
    $(1);
    if (!$(true)) {
      break;
    }
  }
  $(`after, wont eval due to infinite loop`);
} else {
  $(`after, wont eval due to infinite loop`);
}
`````

## Pre Normal


`````js filename=intro
while ($(true)) {
  $continue: {
    {
      if ($(1)) {
        break $continue;
        $(`fail`);
      } else {
        break $continue;
        $(`fail`);
      }
      $(`fail`);
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
        break $continue;
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
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const b = $( true );
    if (b) {

    }
    else {
      break;
    }
  }
  $( "after, wont eval due to infinite loop" );
}
else {
  $( "after, wont eval due to infinite loop" );
}
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
