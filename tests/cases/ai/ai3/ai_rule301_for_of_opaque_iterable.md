# Preval test case

# ai_rule301_for_of_opaque_iterable.md

> Ai > Ai3 > Ai rule301 for of opaque iterable
>
> Test: for...of loop with an opaque iterable.

## Input

`````js filename=intro
// Expected: Loop structure preserved, item is opaque within the loop.
let iterable = $('iterable', [10, 20]);
let sum = 0;
for (const item of iterable) {
  $('item', item);
  sum += item; // This will likely cause runtime issues if item is not a number due to $ opacity.
}
$('sum', sum);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [10, 20];
const iterable /*:unknown*/ = $(`iterable`, tmpCalleeParam);
let sum /*:primitive*/ = 0;
const tmpForOfGenNext /*:unknown*/ = $forOf(iterable);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
  const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const item /*:unknown*/ = tmpForOfNext.value;
    $(`item`, item);
    sum = sum + item;
  }
}
$(`sum`, sum);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const iterable = $(`iterable`, [10, 20]);
let sum = 0;
const tmpForOfGenNext = $forOf(iterable);
while (true) {
  const tmpForOfNext = tmpForOfGenNext();
  if (tmpForOfNext.done) {
    break;
  } else {
    const item = tmpForOfNext.value;
    $(`item`, item);
    sum = sum + item;
  }
}
$(`sum`, sum);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 10, 20 ];
const b = $( "iterable", a );
let c = 0;
const d = $forOf( b );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = d();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    const g = e.value;
    $( "item", g );
    c = c + g;
  }
}
$( "sum", c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [10, 20];
let iterable = $(`iterable`, tmpCalleeParam);
let sum = 0;
const tmpForOfGenNext = $forOf(iterable);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext = tmpForOfGenNext();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const item = tmpForOfNext.value;
    $(`item`, item);
    sum = sum + item;
  }
}
$(`sum`, sum);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'iterable', [10, 20]
 - 2: 'item', 'i'
 - 3: 'item', 't'
 - 4: 'item', 'e'
 - 5: 'item', 'r'
 - 6: 'item', 'a'
 - 7: 'item', 'b'
 - 8: 'item', 'l'
 - 9: 'item', 'e'
 - 10: 'sum', '0iterable'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
