# Preval test case

# if_else_partial2.md

> Normalize > Dce > Continue > If else partial2
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
while ($(true)) {
  if ($(1)) {
  } else {
    continue;
    $('fail');
  }
  $('keep');
}
$('after, wont eval due to infinite loop');
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(1);
  if (tmpIfTest$1) {
    $(`keep`);
  } else {
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 /*:unknown*/ = $(true);
    if (tmpIfTest$2) {
      const tmpIfTest$4 /*:unknown*/ = $(1);
      if (tmpIfTest$4) {
        $(`keep`);
      } else {
      }
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
  if ($(1)) {
    $(`keep`);
  }
  while (true) {
    if ($(true)) {
      if ($(1)) {
        $(`keep`);
      }
    } else {
      break;
    }
  }
  $(`after, wont eval due to infinite loop`);
} else {
  $(`after, wont eval due to infinite loop`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( 1 );
  if (b) {
    $( "keep" );
  }
  while ($LOOP_UNROLL_10) {
    const c = $( true );
    if (c) {
      const d = $( 1 );
      if (d) {
        $( "keep" );
      }
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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 1
 - 3: 'keep'
 - 4: true
 - 5: 1
 - 6: 'keep'
 - 7: true
 - 8: 1
 - 9: 'keep'
 - 10: true
 - 11: 1
 - 12: 'keep'
 - 13: true
 - 14: 1
 - 15: 'keep'
 - 16: true
 - 17: 1
 - 18: 'keep'
 - 19: true
 - 20: 1
 - 21: 'keep'
 - 22: true
 - 23: 1
 - 24: 'keep'
 - 25: true
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
