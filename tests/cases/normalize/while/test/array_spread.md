# Preval test case

# array_spread.md

> Normalize > While > Test > Array spread
>
> Certain test values can be statically determined to be true or false

## Input

`````js filename=intro
while ([...$([1, 2, 3])]) {
  $('loop');
}
$('after');
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2, 3];
  const tmpArrSpread /*:unknown*/ = $(tmpCalleeParam);
  [...tmpArrSpread];
  $(`loop`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  const tmpArrSpread = $([1, 2, 3]);
  [...tmpArrSpread];
  $(`loop`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = [ 1, 2, 3 ];
  const b = $( a );
  [ ...b ];
  $( "loop" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  let tmpCalleeParam = [1, 2, 3];
  const tmpArrSpread = $(tmpCalleeParam);
  const tmpIfTest = [...tmpArrSpread];
  if (tmpIfTest) {
    $(`loop`);
  } else {
    break;
  }
}
$(`after`);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 'loop'
 - 3: [1, 2, 3]
 - 4: 'loop'
 - 5: [1, 2, 3]
 - 6: 'loop'
 - 7: [1, 2, 3]
 - 8: 'loop'
 - 9: [1, 2, 3]
 - 10: 'loop'
 - 11: [1, 2, 3]
 - 12: 'loop'
 - 13: [1, 2, 3]
 - 14: 'loop'
 - 15: [1, 2, 3]
 - 16: 'loop'
 - 17: [1, 2, 3]
 - 18: 'loop'
 - 19: [1, 2, 3]
 - 20: 'loop'
 - 21: [1, 2, 3]
 - 22: 'loop'
 - 23: [1, 2, 3]
 - 24: 'loop'
 - 25: [1, 2, 3]
 - 26: 'loop'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
