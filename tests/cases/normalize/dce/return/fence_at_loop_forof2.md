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
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2];
const tmpForOfGenNext /*:unknown*/ = $forOf(tmpCalleeParam);
const tmpForOfNext /*:unknown*/ = tmpForOfGenNext();
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
const tmpForOfGenNext = $forOf([1, 2]);
const tmpForOfNext = tmpForOfGenNext();
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
const c = b();
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = [1, 2];
  const tmpForOfGenNext = $forOf(tmpCalleeParam);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpForOfNext = tmpForOfGenNext();
    const tmpIfTest = tmpForOfNext.done;
    if (tmpIfTest) {
      break;
    } else {
      let x = tmpForOfNext.value;
      $(`for`, x);
      return undefined;
    }
  }
  $(`unreachable (but keep because the for body may not be visited...)`);
  return undefined;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) fixme: spyless vars and labeled nodes


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
