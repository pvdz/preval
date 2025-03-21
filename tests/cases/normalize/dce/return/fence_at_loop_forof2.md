# Preval test case

# fence_at_loop_forof2.md

> Normalize > Dce > Return > Fence at loop forof2
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
function f() {
  for (let x of [1, 2]) {
    $('for', x);
    return;
  }

  // We can drop this if we implement a specific case for the `of` rhs being an array literal
  $('unreachable (but keep because the for body may not be visited...)');
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [1, 2];
const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
const tmpIfTest /*:unknown*/ = tmpForOfNext.done;
if (tmpIfTest) {
  $(`unreachable (but keep because the for body may not be visited...)`);
  $(undefined);
} else {
  const x /*:unknown*/ = tmpForOfNext.value;
  $(`for`, x);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpForOfNext = $forOf([1, 2]).next();
if (tmpForOfNext.done) {
  $(`unreachable (but keep because the for body may not be visited...)`);
  $(undefined);
} else {
  $(`for`, tmpForOfNext.value);
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2 ];
const b = $forOf( a );
const c = b.next();
const d = c.done;
if (d) {
  $( "unreachable (but keep because the for body may not be visited...)" );
  $( undefined );
}
else {
  const e = c.value;
  $( "for", e );
  $( undefined );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'for', 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
