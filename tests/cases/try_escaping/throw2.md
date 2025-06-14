# Preval test case

# throw2.md

> Try escaping > Throw2
>
> The arr is left in a loop and .reverse() is called, to prevent elimination
> The .reverse() cannot change the array element type and the rule knows this.

## Input

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    arr = $;
    $(arr[0]);
    arr.reverse();
  } catch {
    $('fail');
  }
}
`````


## Settled


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    throw `Preval: Cannot write to const binding \`arr\``;
  } catch (e) {
    $(`fail`);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  try {
    throw `Preval: Cannot write to const binding \`arr\``;
  } catch (e) {
    $(`fail`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    throw "Preval: Cannot write to const binding `arr`";
  }
  catch (a) {
    $( "fail" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    arr = $;
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


- (todo) Support this node type in isFree: ThrowStatement
- (todo) do we want to support ArrayExpression as expression statement in free loops?


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
