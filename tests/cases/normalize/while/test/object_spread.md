# Preval test case

# object_spread.md

> Normalize > While > Test > Object spread
>
> Certain test values can be statically determined to be true or false

## Input

`````js filename=intro
while ({...$({a: $(1), b: $(2)})}) {
  $('loop');
}
$('after');
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpObjLitVal /*:unknown*/ = $(1);
  const tmpObjLitVal$1 /*:unknown*/ = $(2);
  const tmpCalleeParam /*:object*/ = { a: tmpObjLitVal, b: tmpObjLitVal$1 };
  const tmpObjSpread /*:unknown*/ = $(tmpCalleeParam);
  ({ ...tmpObjSpread });
  $(`loop`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$1 = $(2);
  const tmpObjSpread = $({ a: tmpObjLitVal, b: tmpObjLitVal$1 });
  ({ ...tmpObjSpread });
  $(`loop`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = $( 1 );
  const b = $( 2 );
  const c = {
    a: a,
    b: b,
  };
  const d = $( c );
  { ... d };
  $( "loop" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
while (true) {
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$1 = $(2);
  let tmpCalleeParam = { a: tmpObjLitVal, b: tmpObjLitVal$1 };
  const tmpObjSpread = $(tmpCalleeParam);
  const tmpIfTest = { ...tmpObjSpread };
  if (tmpIfTest) {
    $(`loop`);
  } else {
    break;
  }
}
$(`after`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { a: '1', b: '2' }
 - 4: 'loop'
 - 5: 1
 - 6: 2
 - 7: { a: '1', b: '2' }
 - 8: 'loop'
 - 9: 1
 - 10: 2
 - 11: { a: '1', b: '2' }
 - 12: 'loop'
 - 13: 1
 - 14: 2
 - 15: { a: '1', b: '2' }
 - 16: 'loop'
 - 17: 1
 - 18: 2
 - 19: { a: '1', b: '2' }
 - 20: 'loop'
 - 21: 1
 - 22: 2
 - 23: { a: '1', b: '2' }
 - 24: 'loop'
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
