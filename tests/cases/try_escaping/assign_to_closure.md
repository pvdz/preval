# Preval test case

# assign_to_closure.md

> Try escaping > Assign to closure
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
let x = 1;
function f() {
  $(x);
}
$(f);
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    x = 2;
    $(arr[0]);
    arr.reverse();
  } catch {
    $('fail');
  }
}
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  $(x);
  return undefined;
};
let x /*:number*/ = 1;
$(f);
const arr /*:array*/ = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  x = 2;
  const tmpCalleeParam /*:primitive*/ = arr[0];
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
const f = function () {
  $(x);
};
let x = 1;
$(f);
const arr = [1, 2, 3];
while (true) {
  x = 2;
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
const a = function() {
  debugger;
  $( b );
  return undefined;
};
let b = 1;
$( a );
const c = [ 1, 2, 3 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  b = 2;
  const d = c[ 0 ];
  try {
    $( d );
    $dotCall( $array_reverse, c, "reverse" );
  }
  catch (e) {
    $( "fail" );
  }
}
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_reverse
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) support array reads statement type WhileStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
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
