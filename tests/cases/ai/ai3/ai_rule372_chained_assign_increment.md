# Preval test case

# ai_rule372_chained_assign_increment.md

> Ai > Ai3 > Ai rule372 chained assign increment
>
> Rule 372: Chained assignment with prefix increment

## Input

`````js filename=intro
(function() {
  let a = { prop: 0 };
  let b = { prop: 0 };
  let c = { val: $('initial_c_val', 5) };
  let result;

  // Test 1: Chained assignment with prefix increment
  // The value of (++c.val) is c.val AFTER increment.
  // This value is then assigned to b.prop, then to a.prop.
  // The result of the whole assignment expression is this final value.
  result = (a.prop = b.prop = ++c.val);

  $('final_a_prop', a.prop);
  $('final_b_prop', b.prop);
  $('final_c_val', c.val);
  $('final_result', result);

  // Test 2: Reset and try with postfix increment (SyntaxError in strict mode for `x = y++ = z`)
  // Instead, let's test a sequence where postfix is used correctly before assignment chain.
  a.prop = 0; b.prop = 0; c.val = $('initial_c_val2', 10);
  let temp_for_postfix;
  result = (temp_for_postfix = c.val++, a.prop = b.prop = temp_for_postfix);

  $('postfix_final_a_prop', a.prop);
  $('postfix_final_b_prop', b.prop);
  $('postfix_final_c_val', c.val); // Should be incremented
  $('postfix_final_result', result); // Should be value BEFORE increment
  $('postfix_temp_val', temp_for_postfix);

})();
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(`initial_c_val`, 5);
const tmpUpdNum /*:number*/ = $coerce(tmpObjLitVal, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
$(`final_a_prop`, tmpUpdInc);
$(`final_b_prop`, tmpUpdInc);
$(`final_c_val`, tmpUpdInc);
$(`final_result`, tmpUpdInc);
const tmpAssignMemRhs /*:unknown*/ = $(`initial_c_val2`, 10);
const tmpUpdNum$1 /*:number*/ = $coerce(tmpAssignMemRhs, `number`);
$(`postfix_final_a_prop`, tmpUpdNum$1);
$(`postfix_final_b_prop`, tmpUpdNum$1);
const tmpUpdInc$1 /*:number*/ = tmpUpdNum$1 + 1;
$(`postfix_final_c_val`, tmpUpdInc$1);
$(`postfix_final_result`, tmpUpdNum$1);
$(`postfix_temp_val`, tmpUpdNum$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUpdInc = Number($(`initial_c_val`, 5)) + 1;
$(`final_a_prop`, tmpUpdInc);
$(`final_b_prop`, tmpUpdInc);
$(`final_c_val`, tmpUpdInc);
$(`final_result`, tmpUpdInc);
const tmpUpdNum$1 = Number($(`initial_c_val2`, 10));
$(`postfix_final_a_prop`, tmpUpdNum$1);
$(`postfix_final_b_prop`, tmpUpdNum$1);
$(`postfix_final_c_val`, tmpUpdNum$1 + 1);
$(`postfix_final_result`, tmpUpdNum$1);
$(`postfix_temp_val`, tmpUpdNum$1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "initial_c_val", 5 );
const b = $coerce( a, "number" );
const c = b + 1;
$( "final_a_prop", c );
$( "final_b_prop", c );
$( "final_c_val", c );
$( "final_result", c );
const d = $( "initial_c_val2", 10 );
const e = $coerce( d, "number" );
$( "postfix_final_a_prop", e );
$( "postfix_final_b_prop", e );
const f = e + 1;
$( "postfix_final_c_val", f );
$( "postfix_final_result", e );
$( "postfix_temp_val", e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let a = { prop: 0 };
  let b = { prop: 0 };
  const tmpObjLitVal = $(`initial_c_val`, 5);
  let c = { val: tmpObjLitVal };
  let result = undefined;
  const tmpUpdObj = c;
  const tmpUpdProp = tmpUpdObj.val;
  const tmpUpdNum = $coerce(tmpUpdProp, `number`);
  const tmpUpdInc = tmpUpdNum + 1;
  tmpUpdObj.val = tmpUpdInc;
  const tmpInitAssignLhsComputedRhs = tmpUpdInc;
  b.prop = tmpInitAssignLhsComputedRhs;
  const tmpNestedAssignPropRhs = tmpInitAssignLhsComputedRhs;
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  a.prop = tmpNestedPropAssignRhs;
  result = tmpNestedPropAssignRhs;
  let tmpCalleeParam = a.prop;
  $(`final_a_prop`, tmpCalleeParam);
  let tmpCalleeParam$1 = b.prop;
  $(`final_b_prop`, tmpCalleeParam$1);
  let tmpCalleeParam$3 = c.val;
  $(`final_c_val`, tmpCalleeParam$3);
  $(`final_result`, result);
  a.prop = 0;
  b.prop = 0;
  const tmpAssignMemLhsObj = c;
  const tmpAssignMemRhs = $(`initial_c_val2`, 10);
  tmpAssignMemLhsObj.val = tmpAssignMemRhs;
  let temp_for_postfix = undefined;
  const tmpUpdObj$1 = c;
  const tmpUpdProp$1 = tmpUpdObj$1.val;
  const tmpUpdNum$1 = $coerce(tmpUpdProp$1, `number`);
  const tmpUpdInc$1 = tmpUpdNum$1 + 1;
  tmpUpdObj$1.val = tmpUpdInc$1;
  temp_for_postfix = tmpUpdNum$1;
  const tmpInitAssignLhsComputedRhs$1 = temp_for_postfix;
  b.prop = tmpInitAssignLhsComputedRhs$1;
  const tmpNestedAssignPropRhs$1 = tmpInitAssignLhsComputedRhs$1;
  const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$1;
  a.prop = tmpNestedPropAssignRhs$1;
  result = tmpNestedPropAssignRhs$1;
  let tmpCalleeParam$5 = a.prop;
  $(`postfix_final_a_prop`, tmpCalleeParam$5);
  let tmpCalleeParam$7 = b.prop;
  $(`postfix_final_b_prop`, tmpCalleeParam$7);
  let tmpCalleeParam$9 = c.val;
  $(`postfix_final_c_val`, tmpCalleeParam$9);
  $(`postfix_final_result`, result);
  $(`postfix_temp_val`, temp_for_postfix);
  return undefined;
};
tmpCallComplexCallee();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'initial_c_val', 5
 - 2: 'final_a_prop', NaN
 - 3: 'final_b_prop', NaN
 - 4: 'final_c_val', NaN
 - 5: 'final_result', NaN
 - 6: 'initial_c_val2', 10
 - 7: 'postfix_final_a_prop', NaN
 - 8: 'postfix_final_b_prop', NaN
 - 9: 'postfix_final_c_val', NaN
 - 10: 'postfix_final_result', NaN
 - 11: 'postfix_temp_val', NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
