# Preval test case

# ai_rule359_opt_chain_method_call_opaque_arg_effects.md

> Ai > Ai3 > Ai rule359 opt chain method call opaque arg effects
>
> Test: Optional chain method call with opaque side-effecting arguments.

## Input

`````js filename=intro
// Expected: (obj?.method should call method if obj exists, arg effects run before method call)
let objWithValue = $('get_obj_with_method', {
  m: function(arg1, arg2) {
    $('method_m_called', arg1, arg2);
    return $('method_m_return', String(arg1) + String(arg2));
  }
});
let objNull = $('get_null_obj', null);

let result1 = objWithValue?.m($('arg1_fx_call1'), $('arg2_fx_call1'));
$('final_result1', result1);

$('between_calls');

let result2 = objNull?.m($('arg1_fx_call2_unlikely'), $('arg2_fx_call2_unlikely'));
$('final_result2', result2);

$('done');
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
  const arg1 /*:unknown*/ = $$0;
  const arg2 /*:unknown*/ = $$1;
  debugger;
  $(`method_m_called`, arg1, arg2);
  const tmpBinBothLhs /*:string*/ = $coerce(arg1, `string`);
  const tmpBinBothRhs /*:string*/ = $coerce(arg2, `string`);
  const tmpCalleeParam$1 /*:string*/ = tmpBinBothLhs + tmpBinBothRhs;
  const tmpReturnArg /*:unknown*/ = $(`method_m_return`, tmpCalleeParam$1);
  return tmpReturnArg;
};
const tmpCalleeParam /*:object*/ /*truthy*/ = { m: tmpObjLitVal };
const objWithValue /*:unknown*/ = $(`get_obj_with_method`, tmpCalleeParam);
const objNull /*:unknown*/ = $(`get_null_obj`, null);
const tmpIfTest /*:boolean*/ = objWithValue == null;
if (tmpIfTest) {
  $(`final_result1`, undefined);
  $(`between_calls`);
} else {
  const tmpChainElementObject /*:unknown*/ = objWithValue.m;
  const tmpCalleeParam$3 /*:unknown*/ = $(`arg1_fx_call1`);
  const tmpCalleeParam$5 /*:unknown*/ = $(`arg2_fx_call1`);
  const tmpChainElementCall /*:unknown*/ = $dotCall(tmpChainElementObject, objWithValue, `m`, tmpCalleeParam$3, tmpCalleeParam$5);
  $(`final_result1`, tmpChainElementCall);
  $(`between_calls`);
}
const tmpIfTest$1 /*:boolean*/ = objNull == null;
if (tmpIfTest$1) {
  $(`final_result2`, undefined);
  $(`done`);
} else {
  const tmpChainElementObject$1 /*:unknown*/ = objNull.m;
  const tmpCalleeParam$7 /*:unknown*/ = $(`arg1_fx_call2_unlikely`);
  const tmpCalleeParam$9 /*:unknown*/ = $(`arg2_fx_call2_unlikely`);
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, objNull, `m`, tmpCalleeParam$7, tmpCalleeParam$9);
  $(`final_result2`, tmpChainElementCall$1);
  $(`done`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = function (arg1, arg2) {
  $(`method_m_called`, arg1, arg2);
  const tmpBinBothLhs = $coerce(arg1, `string`);
  const tmpReturnArg = $(`method_m_return`, tmpBinBothLhs + $coerce(arg2, `string`));
  return tmpReturnArg;
};
const objWithValue = $(`get_obj_with_method`, { m: tmpObjLitVal });
const objNull = $(`get_null_obj`, null);
if (objWithValue == null) {
  $(`final_result1`, undefined);
  $(`between_calls`);
} else {
  const tmpChainElementObject = objWithValue.m;
  const tmpCalleeParam$3 = $(`arg1_fx_call1`);
  $(`final_result1`, $dotCall(tmpChainElementObject, objWithValue, `m`, tmpCalleeParam$3, $(`arg2_fx_call1`)));
  $(`between_calls`);
}
if (objNull == null) {
  $(`final_result2`, undefined);
  $(`done`);
} else {
  const tmpChainElementObject$1 = objNull.m;
  const tmpCalleeParam$7 = $(`arg1_fx_call2_unlikely`);
  $(`final_result2`, $dotCall(tmpChainElementObject$1, objNull, `m`, tmpCalleeParam$7, $(`arg2_fx_call2_unlikely`)));
  $(`done`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  $( "method_m_called", b, c );
  const d = $coerce( b, "string" );
  const e = $coerce( c, "string" );
  const f = d + e;
  const g = $( "method_m_return", f );
  return g;
};
const h = { m: a };
const i = $( "get_obj_with_method", h );
const j = $( "get_null_obj", null );
const k = i == null;
if (k) {
  $( "final_result1", undefined );
  $( "between_calls" );
}
else {
  const l = i.m;
  const m = $( "arg1_fx_call1" );
  const n = $( "arg2_fx_call1" );
  const o = $dotCall( l, i, "m", m, n );
  $( "final_result1", o );
  $( "between_calls" );
}
const p = j == null;
if (p) {
  $( "final_result2", undefined );
  $( "done" );
}
else {
  const q = j.m;
  const r = $( "arg1_fx_call2_unlikely" );
  const s = $( "arg2_fx_call2_unlikely" );
  const t = $dotCall( q, j, "m", r, s );
  $( "final_result2", t );
  $( "done" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = function ($$0, $$1) {
  let arg1 = $$0;
  let arg2 = $$1;
  debugger;
  $(`method_m_called`, arg1, arg2);
  const tmpBinBothLhs = $coerce(arg1, `string`);
  const tmpBinBothRhs = $coerce(arg2, `string`);
  let tmpCalleeParam$1 = tmpBinBothLhs + tmpBinBothRhs;
  const tmpReturnArg = $(`method_m_return`, tmpCalleeParam$1);
  return tmpReturnArg;
};
let tmpCalleeParam = { m: tmpObjLitVal };
let objWithValue = $(`get_obj_with_method`, tmpCalleeParam);
let objNull = $(`get_null_obj`, null);
let result1 = undefined;
const tmpChainRootProp = objWithValue;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.m;
  let tmpCalleeParam$3 = $(`arg1_fx_call1`);
  let tmpCalleeParam$5 = $(`arg2_fx_call1`);
  const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, `m`, tmpCalleeParam$3, tmpCalleeParam$5);
  result1 = tmpChainElementCall;
  $(`final_result1`, tmpChainElementCall);
  $(`between_calls`);
} else {
  $(`final_result1`, result1);
  $(`between_calls`);
}
let result2 = undefined;
const tmpChainRootProp$1 = objNull;
const tmpIfTest$1 = tmpChainRootProp$1 != null;
if (tmpIfTest$1) {
  const tmpChainElementObject$1 = tmpChainRootProp$1.m;
  let tmpCalleeParam$7 = $(`arg1_fx_call2_unlikely`);
  let tmpCalleeParam$9 = $(`arg2_fx_call2_unlikely`);
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainRootProp$1, `m`, tmpCalleeParam$7, tmpCalleeParam$9);
  result2 = tmpChainElementCall$1;
  $(`final_result2`, tmpChainElementCall$1);
  $(`done`);
} else {
  $(`final_result2`, result2);
  $(`done`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'get_obj_with_method', { m: '"<function>"' }
 - 2: 'get_null_obj', null
 - 3: 'arg1_fx_call1'
 - 4: 'arg2_fx_call1'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
