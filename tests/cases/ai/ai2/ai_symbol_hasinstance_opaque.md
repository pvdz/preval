# Preval test case

# ai_symbol_hasinstance_opaque.md

> Ai > Ai2 > Ai symbol hasinstance opaque
>
> Test: instanceof with opaque Symbol.hasInstance.

## Input

`````js filename=intro
// Expected: Opaque [Symbol.hasInstance] method is called.
let CtorLike = $('CtorLike_obj', function(){ this.isCtor = true; });
let has_instance_called_log = [];

CtorLike[Symbol.hasInstance] = function(inst_param) {
  has_instance_called_log.push('called_with_' + typeof inst_param);
  $('hasInstance_method_called', inst_param);
  // Opaque decision logic
  return $('hasInstance_return_val', inst_param instanceof Object && $('cond_inside_hasInst', true));
};

let obj_to_check1 = $('obj_for_hasInst_check1', {});
let obj_to_check2 = $('obj_for_hasInst_check2', 'not_an_object');

$('instanceof_hasInst_result1', obj_to_check1 instanceof CtorLike);
$('instanceof_hasInst_result2', obj_to_check2 instanceof CtorLike);
$('has_instance_log_output', has_instance_called_log.join(','));

// Case: Symbol.hasInstance is an opaque value itself (not a function initially)
let CtorLike2 = $('CtorLike2_obj');
CtorLike2[Symbol.hasInstance] = $('opaque_hasInstance_prop_val'); // Not a function
try {
  $('instanceof_opaque_non_func_hasInst', {} instanceof CtorLike2);
} catch (e) {
  $('instanceof_opaque_non_func_error', e.name);
}
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:()=>undefined*/ = function () {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  tmpPrevalAliasThis.isCtor = true;
  return undefined;
};
const CtorLike /*:unknown*/ = $(`CtorLike_obj`, tmpCalleeParam);
const has_instance_called_log /*:array*/ /*truthy*/ = [];
const tmpAssignComMemLhsProp /*:unknown*/ = Symbol.hasInstance;
const tmpAssignComputedRhs /*:(unknown)=>unknown*/ = function ($$0) {
  const inst_param /*:unknown*/ = $$0;
  debugger;
  const tmpBinBothRhs$1 /*:string*/ /*truthy*/ = typeof inst_param;
  const tmpMCP /*:string*/ /*truthy*/ = `called_with_${tmpBinBothRhs$1}`;
  $dotCall($array_push, has_instance_called_log, `push`, tmpMCP);
  $(`hasInstance_method_called`, inst_param);
  const tmpCalleeParam$1 /*:boolean*/ = inst_param instanceof Object;
  if (tmpCalleeParam$1) {
    const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(`cond_inside_hasInst`, true);
    const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(`hasInstance_return_val`, tmpClusterSSA_tmpCalleeParam$1);
    return tmpClusterSSA_tmpReturnArg;
  } else {
    const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = $(`hasInstance_return_val`, false);
    return tmpClusterSSA_tmpReturnArg$1;
  }
};
CtorLike[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
const tmpCalleeParam$3 /*:object*/ /*truthy*/ = {};
const obj_to_check1 /*:unknown*/ = $(`obj_for_hasInst_check1`, tmpCalleeParam$3);
const obj_to_check2 /*:unknown*/ = $(`obj_for_hasInst_check2`, `not_an_object`);
const tmpCalleeParam$5 /*:boolean*/ = obj_to_check1 instanceof CtorLike;
$(`instanceof_hasInst_result1`, tmpCalleeParam$5);
const tmpCalleeParam$7 /*:boolean*/ = obj_to_check2 instanceof CtorLike;
$(`instanceof_hasInst_result2`, tmpCalleeParam$7);
const tmpCalleeParam$9 /*:string*/ = $dotCall($array_join, has_instance_called_log, `join`, `,`);
$(`has_instance_log_output`, tmpCalleeParam$9);
const CtorLike2 /*:unknown*/ = $(`CtorLike2_obj`);
const tmpAssignComMemLhsProp$1 /*:unknown*/ = Symbol.hasInstance;
const tmpAssignComputedRhs$1 /*:unknown*/ = $(`opaque_hasInstance_prop_val`);
CtorLike2[tmpAssignComMemLhsProp$1] = tmpAssignComputedRhs$1;
try {
  const tmpBinLhs /*:object*/ /*truthy*/ = {};
  const tmpCalleeParam$11 /*:boolean*/ = tmpBinLhs instanceof CtorLike2;
  $(`instanceof_opaque_non_func_hasInst`, tmpCalleeParam$11);
} catch (e) {
  const tmpCalleeParam$13 /*:unknown*/ = e.name;
  $(`instanceof_opaque_non_func_error`, tmpCalleeParam$13);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const CtorLike = $(`CtorLike_obj`, function () {
  const tmpPrevalAliasThis = this;
  tmpPrevalAliasThis.isCtor = true;
});
const has_instance_called_log = [];
const tmpAssignComMemLhsProp = Symbol.hasInstance;
const tmpAssignComputedRhs = function (inst_param) {
  const tmpBinBothRhs$1 = typeof inst_param;
  $dotCall($array_push, has_instance_called_log, `push`, `called_with_${tmpBinBothRhs$1}`);
  $(`hasInstance_method_called`, inst_param);
  if (inst_param instanceof Object) {
    const tmpClusterSSA_tmpReturnArg = $(`hasInstance_return_val`, $(`cond_inside_hasInst`, true));
    return tmpClusterSSA_tmpReturnArg;
  } else {
    const tmpClusterSSA_tmpReturnArg$1 = $(`hasInstance_return_val`, false);
    return tmpClusterSSA_tmpReturnArg$1;
  }
};
CtorLike[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
const obj_to_check1 = $(`obj_for_hasInst_check1`, {});
const obj_to_check2 = $(`obj_for_hasInst_check2`, `not_an_object`);
$(`instanceof_hasInst_result1`, obj_to_check1 instanceof CtorLike);
$(`instanceof_hasInst_result2`, obj_to_check2 instanceof CtorLike);
$(`has_instance_log_output`, $dotCall($array_join, has_instance_called_log, `join`, `,`));
const CtorLike2 = $(`CtorLike2_obj`);
const tmpAssignComMemLhsProp$1 = Symbol.hasInstance;
const tmpAssignComputedRhs$1 = $(`opaque_hasInstance_prop_val`);
CtorLike2[tmpAssignComMemLhsProp$1] = tmpAssignComputedRhs$1;
try {
  $(`instanceof_opaque_non_func_hasInst`, {} instanceof CtorLike2);
} catch (e) {
  $(`instanceof_opaque_non_func_error`, e.name);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  b.isCtor = true;
  return undefined;
};
const c = $( "CtorLike_obj", a );
const d = [];
const e = Symbol.hasInstance;
const f = function($$0 ) {
  const g = $$0;
  debugger;
  const h = typeof g;
  const i = `called_with_${h}`;
  $dotCall( $array_push, d, "push", i );
  $( "hasInstance_method_called", g );
  const j = g instanceof Object;
  if (j) {
    const k = $( "cond_inside_hasInst", true );
    const l = $( "hasInstance_return_val", k );
    return l;
  }
  else {
    const m = $( "hasInstance_return_val", false );
    return m;
  }
};
c[e] = f;
const n = {};
const o = $( "obj_for_hasInst_check1", n );
const p = $( "obj_for_hasInst_check2", "not_an_object" );
const q = o instanceof c;
$( "instanceof_hasInst_result1", q );
const r = p instanceof c;
$( "instanceof_hasInst_result2", r );
const s = $dotCall( $array_join, d, "join", "," );
$( "has_instance_log_output", s );
const t = $( "CtorLike2_obj" );
const u = Symbol.hasInstance;
const v = $( "opaque_hasInstance_prop_val" );
t[u] = v;
try {
  const w = {};
  const x = w instanceof t;
  $( "instanceof_opaque_non_func_hasInst", x );
}
catch (y) {
  const z = y.name;
  $( "instanceof_opaque_non_func_error", z );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  tmpPrevalAliasThis.isCtor = true;
  return undefined;
};
let CtorLike = $(`CtorLike_obj`, tmpCalleeParam);
let has_instance_called_log = [];
const tmpAssignComMemLhsObj = CtorLike;
const tmpAssignComMemLhsProp = Symbol.hasInstance;
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpAssignComputedRhs = function ($$0) {
  let inst_param = $$0;
  debugger;
  const tmpMCF = has_instance_called_log.push;
  const tmpBinBothLhs = `called_with_`;
  const tmpBinBothRhs = typeof inst_param;
  const tmpMCP = tmpBinBothLhs + tmpBinBothRhs;
  $dotCall(tmpMCF, has_instance_called_log, `push`, tmpMCP);
  $(`hasInstance_method_called`, inst_param);
  let tmpCalleeParam$1 = inst_param instanceof Object;
  if (tmpCalleeParam$1) {
    tmpCalleeParam$1 = $(`cond_inside_hasInst`, true);
  } else {
  }
  const tmpReturnArg = $(`hasInstance_return_val`, tmpCalleeParam$1);
  return tmpReturnArg;
};
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
let tmpCalleeParam$3 = {};
let obj_to_check1 = $(`obj_for_hasInst_check1`, tmpCalleeParam$3);
let obj_to_check2 = $(`obj_for_hasInst_check2`, `not_an_object`);
let tmpCalleeParam$5 = obj_to_check1 instanceof CtorLike;
$(`instanceof_hasInst_result1`, tmpCalleeParam$5);
let tmpCalleeParam$7 = obj_to_check2 instanceof CtorLike;
$(`instanceof_hasInst_result2`, tmpCalleeParam$7);
const tmpMCF$1 = has_instance_called_log.join;
let tmpCalleeParam$9 = $dotCall(tmpMCF$1, has_instance_called_log, `join`, `,`);
$(`has_instance_log_output`, tmpCalleeParam$9);
let CtorLike2 = $(`CtorLike2_obj`);
const tmpAssignComMemLhsObj$1 = CtorLike2;
const tmpAssignComMemLhsProp$1 = Symbol.hasInstance;
const tmpAssignComputedObj$1 = tmpAssignComMemLhsObj$1;
const tmpAssignComputedProp$1 = tmpAssignComMemLhsProp$1;
const tmpAssignComputedRhs$1 = $(`opaque_hasInstance_prop_val`);
tmpAssignComputedObj$1[tmpAssignComputedProp$1] = tmpAssignComputedRhs$1;
try {
  const tmpBinLhs = {};
  let tmpCalleeParam$11 = tmpBinLhs instanceof CtorLike2;
  $(`instanceof_opaque_non_func_hasInst`, tmpCalleeParam$11);
} catch (e) {
  let tmpCalleeParam$13 = e.name;
  $(`instanceof_opaque_non_func_error`, tmpCalleeParam$13);
}
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_join
- (todo) access object property that also exists on prototype? $array_push
- (todo) can try-escaping support this expr node type? ObjectExpression
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


BAD@! Found 1 implicit global bindings:

Symbol


## Runtime Outcome


Should call `$` with:
 - 1: 'CtorLike_obj', '<function>'
 - eval returned: ("<crash[ Cannot create property 'Symbol(Symbol.hasInstance)' on string 'CtorLike_obj' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
