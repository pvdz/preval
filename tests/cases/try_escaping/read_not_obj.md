# Preval test case

# read_not_obj.md

> Try escaping > Read not obj
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
const obj = {'1,2,3': 'pass'}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    arr.reverse();
    $(obj[arr]);
  } catch {
    $('fail');
  }
}
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
const obj /*:object*/ /*truthy*/ = { [`1,2,3`]: `pass` };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $dotCall($array_reverse, arr, `reverse`);
    const tmpCalleeParam /*:unknown*/ = obj[arr];
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
const obj = { [`1,2,3`]: `pass` };
while (true) {
  try {
    $dotCall($array_reverse, arr, `reverse`);
    $(obj[arr]);
  } catch (e) {
    $(`fail`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = { [ "1,2,3" ]: "pass" };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $dotCall( $array_reverse, a, "reverse" );
    const c = b[ a ];
    $( c );
  }
  catch (d) {
    $( "fail" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
const obj = { [`1,2,3`]: `pass` };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const tmpMCF = arr.reverse;
    $dotCall(tmpMCF, arr, `reverse`);
    let tmpCalleeParam = obj[arr];
    $(tmpCalleeParam);
  } catch (e) {
    $(`fail`);
  }
}
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) access object property that also exists on prototype? $array_reverse
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) objects in isFree check
- (todo) support array reads statement type VarStatement
- (todo) try escaping may support dotcalling $array_reverse


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 'pass'
 - 3: undefined
 - 4: 'pass'
 - 5: undefined
 - 6: 'pass'
 - 7: undefined
 - 8: 'pass'
 - 9: undefined
 - 10: 'pass'
 - 11: undefined
 - 12: 'pass'
 - 13: undefined
 - 14: 'pass'
 - 15: undefined
 - 16: 'pass'
 - 17: undefined
 - 18: 'pass'
 - 19: undefined
 - 20: 'pass'
 - 21: undefined
 - 22: 'pass'
 - 23: undefined
 - 24: 'pass'
 - 25: undefined
 - 26: 'pass'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
