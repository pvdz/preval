# Preval test case

# ai_rule357_chained_assign_array_element_getter.md

> Ai > Ai3 > Ai rule357 chained assign array element getter
>
> Rule 357: Chained assignment to array element with getter

## Input

`````js filename=intro
(function() {
  let arr = [10, 20];
  let x;
  const getterObj = { get val() { $('getter_called'); return $('getter_val', 30); } };

  x = arr[0] = getterObj.val;

  $('final_x', x);
  $('final_arr_0', arr[0]);
  $('final_arr_1', arr[1]); // Should be unchanged
  $('arr_length', arr.length);
})();
`````


## Settled


`````js filename=intro
const getterObj /*:object*/ = {
  get val() {
    debugger;
    $(`getter_called`);
    const tmpReturnArg /*:unknown*/ = $(`getter_val`, 30);
    return tmpReturnArg;
  },
};
const tmpNestedPropAssignRhs /*:unknown*/ = getterObj.val;
$(`final_x`, tmpNestedPropAssignRhs);
$(`final_arr_0`, tmpNestedPropAssignRhs);
$(`final_arr_1`, 20);
$(`arr_length`, 2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedPropAssignRhs = {
  get val() {
    $(`getter_called`);
    const tmpReturnArg = $(`getter_val`, 30);
    return tmpReturnArg;
  },
}.val;
$(`final_x`, tmpNestedPropAssignRhs);
$(`final_arr_0`, tmpNestedPropAssignRhs);
$(`final_arr_1`, 20);
$(`arr_length`, 2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { get val() {
  debugger;
  $( "getter_called" );
  const b = $( "getter_val", 30 );
  return b;
} };
const c = a.val;
$( "final_x", c );
$( "final_arr_0", c );
$( "final_arr_1", 20 );
$( "arr_length", 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let arr = [10, 20];
  let x = undefined;
  const getterObj = {
    get val() {
      debugger;
      $(`getter_called`);
      const tmpReturnArg = $(`getter_val`, 30);
      return tmpReturnArg;
    },
  };
  const tmpNestedAssignPropRhs = getterObj.val;
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  arr[0] = tmpNestedPropAssignRhs;
  x = tmpNestedPropAssignRhs;
  $(`final_x`, tmpNestedPropAssignRhs);
  let tmpCalleeParam = arr[0];
  $(`final_arr_0`, tmpCalleeParam);
  let tmpCalleeParam$1 = arr[1];
  $(`final_arr_1`, tmpCalleeParam$1);
  let tmpCalleeParam$3 = arr.length;
  $(`arr_length`, tmpCalleeParam$3);
  return undefined;
};
tmpCallComplexCallee();
`````


## Todos triggered


- (todo) can we always safely clone ident refs in this case?
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'getter_called'
 - 2: 'getter_val', 30
 - 3: 'final_x', 'getter_val'
 - 4: 'final_arr_0', 'getter_val'
 - 5: 'final_arr_1', 20
 - 6: 'arr_length', 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
