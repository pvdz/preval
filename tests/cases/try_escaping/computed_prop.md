# Preval test case

# computed_prop.md

> Try escaping > Computed prop
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    arr.reverse();
    $($[arr]());
  } catch {
    $('fail');
  }
}
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $dotCall($array_reverse, arr, `reverse`);
    const tmpCallCompVal$1 /*:unknown*/ = $[arr];
    const tmpCalleeParam /*:unknown*/ = $dotCall(tmpCallCompVal$1, $, undefined);
    $(tmpCalleeParam);
  } catch (e) {
    $(`fail`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [1, 2, 3];
while (true) {
  try {
    $dotCall($array_reverse, arr, `reverse`);
    $($[arr]());
  } catch (e) {
    $(`fail`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $dotCall( $array_reverse, a, "reverse" );
    const b = $[ a ];
    const c = $dotCall( b, $, undefined );
    $( c );
  }
  catch (d) {
    $( "fail" );
  }
}
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_reverse
- (todo) can try-escaping support this expr node type? MemberExpression
- (todo) try escaping may support dotcalling $array_reverse
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) Support this ident in isFree CallExpression: $array_reverse


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'fail'
 - 2: 'fail'
 - 3: 'fail'
 - 4: 'fail'
 - 5: 'fail'
 - 6: 'fail'
 - 7: 'fail'
 - 8: 'fail'
 - 9: 'fail'
 - 10: 'fail'
 - 11: 'fail'
 - 12: 'fail'
 - 13: 'fail'
 - 14: 'fail'
 - 15: 'fail'
 - 16: 'fail'
 - 17: 'fail'
 - 18: 'fail'
 - 19: 'fail'
 - 20: 'fail'
 - 21: 'fail'
 - 22: 'fail'
 - 23: 'fail'
 - 24: 'fail'
 - 25: 'fail'
 - 26: 'fail'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
