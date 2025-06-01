# Preval test case

# ai_array_pass_modify_use.md

> Ai > Ai1 > Ai array pass modify use
>
> Test: Array passed to func, modified in func, used after call.

## Input

`````js filename=intro
// Expected: (Side-effect on mainArr[0] should persist after modifyArr call)
function modifyArr(theArr) {
  $('in_modify_before', theArr[0]);
  theArr[0] = $('modified_in_func');
  $('in_modify_after', theArr[0]);
}
let mainArr = [$('initial_val')];
$('before_call', mainArr[0]);
modifyArr(mainArr);
$('after_call', mainArr[0]);
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(`initial_val`);
$(`before_call`, tmpArrElement);
$(`in_modify_before`, tmpArrElement);
const tmpAssignComputedRhs /*:unknown*/ = $(`modified_in_func`);
$(`in_modify_after`, tmpAssignComputedRhs);
$(`after_call`, tmpAssignComputedRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(`initial_val`);
$(`before_call`, tmpArrElement);
$(`in_modify_before`, tmpArrElement);
const tmpAssignComputedRhs = $(`modified_in_func`);
$(`in_modify_after`, tmpAssignComputedRhs);
$(`after_call`, tmpAssignComputedRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "initial_val" );
$( "before_call", a );
$( "in_modify_before", a );
const b = $( "modified_in_func" );
$( "in_modify_after", b );
$( "after_call", b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let modifyArr = function ($$0) {
  let theArr = $$0;
  debugger;
  let tmpCalleeParam = theArr[0];
  $(`in_modify_before`, tmpCalleeParam);
  const tmpAssignComputedObj = theArr;
  const tmpAssignComputedProp = 0;
  const tmpAssignComputedRhs = $(`modified_in_func`);
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  let tmpCalleeParam$1 = theArr[0];
  $(`in_modify_after`, tmpCalleeParam$1);
  return undefined;
};
const tmpArrElement = $(`initial_val`);
let mainArr = [tmpArrElement];
let tmpCalleeParam$3 = mainArr[0];
$(`before_call`, tmpCalleeParam$3);
modifyArr(mainArr);
let tmpCalleeParam$5 = mainArr[0];
$(`after_call`, tmpCalleeParam$5);
`````


## Todos triggered


- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'initial_val'
 - 2: 'before_call', 'initial_val'
 - 3: 'in_modify_before', 'initial_val'
 - 4: 'modified_in_func'
 - 5: 'in_modify_after', 'modified_in_func'
 - 6: 'after_call', 'modified_in_func'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
