# Preval test case

# spread.md

> Try escaping > Spread
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, ...$, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(arr[0]);
    arr.reverse();
  } catch {
    $('fail');
  }
}
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [1, 2, ...$, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam /*:unknown*/ = arr[0];
  try {
    $(tmpCalleeParam);
    $dotCall($array_reverse, arr, `reverse`);
  } catch (e) {
    $(`fail`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, ...$, 3];
while (true) {
  const tmpCalleeParam = arr[0];
  try {
    $(tmpCalleeParam);
    $dotCall($array_reverse, arr, `reverse`);
  } catch (e) {
    $(`fail`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, ...$, 3 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a[ 0 ];
  try {
    $( b );
    $dotCall( $array_reverse, a, "reverse" );
  }
  catch (c) {
    $( "fail" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, ...$, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    let tmpCalleeParam = arr[0];
    $(tmpCalleeParam);
    const tmpMCF = arr.reverse;
    $dotCall(tmpMCF, arr, `reverse`);
  } catch (e) {
    $(`fail`);
  }
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) access object property that also exists on prototype? $array_reverse
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
