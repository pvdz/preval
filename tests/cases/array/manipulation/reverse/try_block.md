# Preval test case

# try_block.md

> Array > Manipulation > Reverse > Try block
>
> It shouldn't apply the trick in a loop or try when the decl is outside that 
> loop or try because the mutation is unpredictable (contrived cases aside)

## Input

`````js filename=intro
const arr = [1, 2, 3];
const obj = {'1,2,3': 'pass'}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    $(obj[arr]);
    arr.reverse();
  } catch {
    $('fail');
  }
}
`````


## Settled


`````js filename=intro
const obj /*:object*/ /*truthy*/ = { [`1,2,3`]: `pass` };
const arr /*:array*/ /*truthy*/ = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const tmpCalleeParam /*:unknown*/ = obj[arr];
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
const obj = { [`1,2,3`]: `pass` };
const arr = [1, 2, 3];
while (true) {
  try {
    $(obj[arr]);
    $dotCall($array_reverse, arr, `reverse`);
  } catch (e) {
    $(`fail`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ "1,2,3" ]: "pass" };
const b = [ 1, 2, 3 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const c = a[ b ];
    $( c );
    $dotCall( $array_reverse, b, "reverse" );
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
    let tmpCalleeParam = obj[arr];
    $(tmpCalleeParam);
    const tmpMCF = arr.reverse;
    $dotCall(tmpMCF, arr, `reverse`);
  } catch (e) {
    $(`fail`);
  }
}
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_reverse
- (todo) can try-escaping support this expr node type? MemberExpression
- (todo) objects in isFree check
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type WhileStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - 2: undefined
 - 3: 'pass'
 - 4: undefined
 - 5: 'pass'
 - 6: undefined
 - 7: 'pass'
 - 8: undefined
 - 9: 'pass'
 - 10: undefined
 - 11: 'pass'
 - 12: undefined
 - 13: 'pass'
 - 14: undefined
 - 15: 'pass'
 - 16: undefined
 - 17: 'pass'
 - 18: undefined
 - 19: 'pass'
 - 20: undefined
 - 21: 'pass'
 - 22: undefined
 - 23: 'pass'
 - 24: undefined
 - 25: 'pass'
 - 26: undefined
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
