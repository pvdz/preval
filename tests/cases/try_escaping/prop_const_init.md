# Preval test case

# prop_const_init.md

> Try escaping > Prop const init
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_NO_UNROLLS_LEFT) {
  try {
    arr.reverse();
    const x = arr[0];
    $(x);
  } catch {
    $('fail');
  }
}
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
while ($LOOP_NO_UNROLLS_LEFT) {
  try {
    $dotCall($array_reverse, arr, `reverse`);
    const x /*:primitive*/ = arr[0];
    $(x);
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
    $(arr[0]);
  } catch (e) {
    $(`fail`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
while ($LOOP_NO_UNROLLS_LEFT) {
  try {
    $dotCall( $array_reverse, a, "reverse" );
    const b = a[ 0 ];
    $( b );
  }
  catch (c) {
    $( "fail" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_NO_UNROLLS_LEFT) {
  try {
    const tmpMCF = arr.reverse;
    $dotCall(tmpMCF, arr, `reverse`);
    const x = arr[0];
    $(x);
  } catch (e) {
    $(`fail`);
  }
}
`````


## Todos triggered


- (todo) Support this ident in isFree CallExpression: $array_reverse
- (todo) access object property that also exists on prototype? $array_reverse
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) support builtin $array_reverse for array escape analysis
- (todo) try escaping may support dotcalling $array_reverse


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 1
 - 3: 3
 - 4: 1
 - 5: 3
 - 6: 1
 - 7: 3
 - 8: 1
 - 9: 3
 - 10: 1
 - 11: 3
 - 12: 1
 - 13: 3
 - 14: 1
 - 15: 3
 - 16: 1
 - 17: 3
 - 18: 1
 - 19: 3
 - 20: 1
 - 21: 3
 - 22: 1
 - 23: 3
 - 24: 1
 - 25: 3
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
