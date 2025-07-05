# Preval test case

# ai_rule326_empty_loop_opaque_cond.md

> Ai > Ai4 > Ai rule326 empty loop opaque cond
>
> Test: Empty loop while($('cond')); with opaque condition.

## Input

`````js filename=intro
// Expected: while($('cond')); $('after_loop');
while ($('cond')) ;
$('after_loop');
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(`cond`);
if (tmpIfTest) {
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpIfTest$1 /*:unknown*/ = $(`cond`);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
  $(`after_loop`);
} else {
  $(`after_loop`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`cond`)) {
  while (true) {
    if (!$(`cond`)) {
      break;
    }
  }
  $(`after_loop`);
} else {
  $(`after_loop`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "cond" );
if (a) {
  while ($LOOP_UNROLLS_LEFT_10) {
    const b = $( "cond" );
    if (b) {

    }
    else {
      break;
    }
  }
  $( "after_loop" );
}
else {
  $( "after_loop" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  const tmpIfTest = $(`cond`);
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(`after_loop`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'cond'
 - 2: 'cond'
 - 3: 'cond'
 - 4: 'cond'
 - 5: 'cond'
 - 6: 'cond'
 - 7: 'cond'
 - 8: 'cond'
 - 9: 'cond'
 - 10: 'cond'
 - 11: 'cond'
 - 12: 'cond'
 - 13: 'cond'
 - 14: 'cond'
 - 15: 'cond'
 - 16: 'cond'
 - 17: 'cond'
 - 18: 'cond'
 - 19: 'cond'
 - 20: 'cond'
 - 21: 'cond'
 - 22: 'cond'
 - 23: 'cond'
 - 24: 'cond'
 - 25: 'cond'
 - 26: 'cond'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
