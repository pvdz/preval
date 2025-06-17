# Preval test case

# ai_rule323_this_arrow_func_opaque_receiver.md

> Ai > Ai3 > Ai rule323 this arrow func opaque receiver
>
> Test: Lexical 'this' in nested arrow function with opaque outer 'this'.

## Input

`````js filename=intro
// Expected: (obj defined elsewhere or globally as $('myObj')).method = function() { let f = () => $('arrow_this', this); return f(); }; $('myObj').method();
let obj = $('myObj', { val: 1, method: function() { let f = () => $('arrow_this', this); return f(); } } );
obj.method();

// To ensure 'this' is from the call:
let m = obj.method;
let globalCallResult = m(); // 'this' should be global or undefined (strict)
$('global_call_this_check', globalCallResult);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:()=>unknown*/ = function (/*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = $(`arrow_this`, tmpPrevalAliasThis);
  return tmpClusterSSA_tmpReturnArg$1;
};
const tmpCalleeParam /*:object*/ /*truthy*/ = { val: 1, method: tmpObjLitVal$1 };
const obj /*:unknown*/ = $(`myObj`, tmpCalleeParam);
const tmpMCF /*:unknown*/ = obj.method;
$dotCall(tmpMCF, obj, `method`);
const m /*:unknown*/ = obj.method;
const globalCallResult /*:unknown*/ = m();
$(`global_call_this_check`, globalCallResult);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = function () {
  const tmpClusterSSA_tmpReturnArg$1 = $(`arrow_this`, this);
  return tmpClusterSSA_tmpReturnArg$1;
};
const obj = $(`myObj`, { val: 1, method: tmpObjLitVal$1 });
obj.method();
const m = obj.method;
$(`global_call_this_check`, m());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  const c = $( "arrow_this", b );
  return c;
};
const d = {
  val: 1,
  method: a,
};
const e = $( "myObj", d );
const f = e.method;
$dotCall( f, e, "method" );
const g = e.method;
const h = g();
$( "global_call_this_check", h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = 1;
const tmpObjLitVal$1 = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  let f = function () {
    debugger;
    const tmpReturnArg = $(`arrow_this`, tmpPrevalAliasThis);
    return tmpReturnArg;
  };
  const tmpReturnArg$1 = f();
  return tmpReturnArg$1;
};
let tmpCalleeParam = { val: tmpObjLitVal, method: tmpObjLitVal$1 };
let obj = $(`myObj`, tmpCalleeParam);
const tmpMCF = obj.method;
$dotCall(tmpMCF, obj, `method`);
let m = obj.method;
let globalCallResult = m();
$(`global_call_this_check`, globalCallResult);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'myObj', { val: '1', method: '"<function>"' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
