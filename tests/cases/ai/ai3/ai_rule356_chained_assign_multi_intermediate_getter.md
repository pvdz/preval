# Preval test case

# ai_rule356_chained_assign_multi_intermediate_getter.md

> Ai > Ai3 > Ai rule356 chained assign multi intermediate getter
>
> Rule 356: Chained assignment, multiple intermediates, final getter

## Input

`````js filename=intro
(function() {
  let a = {};
  let b;
  let c;
  const getterObj = { get val() { $('getter_called'); return $('getter_val'); } };

  c = b = a.prop = getterObj.val;

  $('final_a_prop', a.prop);
  $('final_b', b);
  $('final_c', c);
  $('a_keys', Object.keys(a).join(','));
})();
`````


## Settled


`````js filename=intro
const getterObj /*:object*/ = {
  get val() {
    debugger;
    $(`getter_called`);
    const tmpReturnArg /*:unknown*/ = $(`getter_val`);
    return tmpReturnArg;
  },
};
const tmpInitAssignLhsComputedRhs /*:unknown*/ = getterObj.val;
$(`final_a_prop`, tmpInitAssignLhsComputedRhs);
$(`final_b`, tmpInitAssignLhsComputedRhs);
$(`final_c`, tmpInitAssignLhsComputedRhs);
const a /*:object*/ = { prop: tmpInitAssignLhsComputedRhs };
const tmpMCOO /*:array*/ = $Object_keys(a);
const tmpCalleeParam$1 /*:string*/ = $dotCall($array_join, tmpMCOO, `join`, `,`);
$(`a_keys`, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpInitAssignLhsComputedRhs = {
  get val() {
    $(`getter_called`);
    const tmpReturnArg = $(`getter_val`);
    return tmpReturnArg;
  },
}.val;
$(`final_a_prop`, tmpInitAssignLhsComputedRhs);
$(`final_b`, tmpInitAssignLhsComputedRhs);
$(`final_c`, tmpInitAssignLhsComputedRhs);
$(`a_keys`, $dotCall($array_join, $Object_keys({ prop: tmpInitAssignLhsComputedRhs }), `join`, `,`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { get val() {
  debugger;
  $( "getter_called" );
  const b = $( "getter_val" );
  return b;
} };
const c = a.val;
$( "final_a_prop", c );
$( "final_b", c );
$( "final_c", c );
const d = { prop: c };
const e = $Object_keys( d );
const f = $dotCall( $array_join, e, "join", "," );
$( "a_keys", f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let a = {};
  let b = undefined;
  let c = undefined;
  const getterObj = {
    get val() {
      debugger;
      $(`getter_called`);
      const tmpReturnArg = $(`getter_val`);
      return tmpReturnArg;
    },
  };
  const tmpInitAssignLhsComputedRhs = getterObj.val;
  a.prop = tmpInitAssignLhsComputedRhs;
  const tmpNestedComplexRhs = tmpInitAssignLhsComputedRhs;
  b = tmpNestedComplexRhs;
  c = tmpNestedComplexRhs;
  let tmpCalleeParam = a.prop;
  $(`final_a_prop`, tmpCalleeParam);
  $(`final_b`, b);
  $(`final_c`, c);
  const tmpMCF = $Object_keys;
  const tmpMCOO = $Object_keys(a);
  const tmpMCF$1 = tmpMCOO.join;
  let tmpCalleeParam$1 = $dotCall(tmpMCF$1, tmpMCOO, `join`, `,`);
  $(`a_keys`, tmpCalleeParam$1);
  return undefined;
};
tmpCallComplexCallee();
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_join
- (todo) type trackeed tricks can possibly support static $Object_keys


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'getter_called'
 - 2: 'getter_val'
 - 3: 'final_a_prop', 'getter_val'
 - 4: 'final_b', 'getter_val'
 - 5: 'final_c', 'getter_val'
 - 6: 'a_keys', 'prop'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
