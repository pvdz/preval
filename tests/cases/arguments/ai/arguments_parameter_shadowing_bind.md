# Preval test case

# arguments_parameter_shadowing_bind.md

> Arguments > Ai > Arguments parameter shadowing bind
>
> Test parameter shadowing with bind

## Input

`````js filename=intro
function testArgsParameterShadowingBind() {
  const args = arguments;
  const bound1 = testTarget.bind(null, args[0]);
  const bound2 = testTarget.bind(null, 1, 2);
  const bound3 = testTarget.bind(null);
  const result1 = bound1(args[1], args[2]);
  const result2 = bound2(args[2]);
  const result3 = bound3(args[0], args[1], args[2]);
  $(result1, result2, result3);
}

function testTarget(a, b, c) {
  return (a || 0) + (b || 0) + (c || 0);
}

testArgsParameterShadowingBind(10, 20, 30);
`````


## Settled


`````js filename=intro
const testArgsParameterShadowingBind /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const tmpMCP /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  const bound1 /*:function*/ /*truthy*/ = $dotCall($function_bind, testTarget, `bind`, null, tmpMCP);
  const bound2 /*:function*/ /*truthy*/ = $dotCall($function_bind, testTarget, `bind`, null, 1, 2);
  const bound3 /*:function*/ /*truthy*/ = $dotCall($function_bind, testTarget, `bind`, null);
  const tmpCalleeParam /*:unknown*/ = tmpPrevalAliasArgumentsAny[1];
  const tmpCalleeParam$1 /*:unknown*/ = tmpPrevalAliasArgumentsAny[2];
  const result1 /*:unknown*/ = bound1(tmpCalleeParam, tmpCalleeParam$1);
  const tmpCalleeParam$3 /*:unknown*/ = tmpPrevalAliasArgumentsAny[2];
  const result2 /*:unknown*/ = bound2(tmpCalleeParam$3);
  const tmpCalleeParam$5 /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  const tmpCalleeParam$7 /*:unknown*/ = tmpPrevalAliasArgumentsAny[1];
  const tmpCalleeParam$9 /*:unknown*/ = tmpPrevalAliasArgumentsAny[2];
  const result3 /*:unknown*/ = bound3(tmpCalleeParam$5, tmpCalleeParam$7, tmpCalleeParam$9);
  $(result1, result2, result3);
  return undefined;
};
const testTarget /*:(unknown, unknown, unknown)=>primitive*/ = function $pcompiled($$0, $$1, $$2) {
  const a /*:unknown*/ = $$0;
  const b /*:unknown*/ = $$1;
  const c /*:unknown*/ = $$2;
  debugger;
  let tmpBinBothLhs$1 /*:unknown*/ /*ternaryConst*/ = a;
  if (a) {
  } else {
    tmpBinBothLhs$1 = 0;
  }
  let tmpBinBothLhs /*:primitive*/ /*ternaryConst*/ = undefined;
  if (b) {
    tmpBinBothLhs = tmpBinBothLhs$1 + b;
  } else {
    tmpBinBothLhs = tmpBinBothLhs$1 + 0;
  }
  if (c) {
    const tmpClusterSSA_tmpReturnArg /*:primitive*/ = tmpBinBothLhs + c;
    return tmpClusterSSA_tmpReturnArg;
  } else {
    const tmpClusterSSA_tmpReturnArg$1 /*:primitive*/ = tmpBinBothLhs + 0;
    return tmpClusterSSA_tmpReturnArg$1;
  }
};
testArgsParameterShadowingBind(10, 20, 30);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsParameterShadowingBind = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const bound1 = $dotCall($function_bind, testTarget, `bind`, null, tmpPrevalAliasArgumentsAny[0]);
  const bound2 = $dotCall($function_bind, testTarget, `bind`, null, 1, 2);
  const bound3 = $dotCall($function_bind, testTarget, `bind`, null);
  const result1 = bound1(tmpPrevalAliasArgumentsAny[1], tmpPrevalAliasArgumentsAny[2]);
  const result2 = bound2(tmpPrevalAliasArgumentsAny[2]);
  const tmpCalleeParam$5 = tmpPrevalAliasArgumentsAny[0];
  const tmpCalleeParam$7 = tmpPrevalAliasArgumentsAny[1];
  $(result1, result2, bound3(tmpCalleeParam$5, tmpCalleeParam$7, tmpPrevalAliasArgumentsAny[2]));
};
const testTarget = function $pcompiled(a, b, c) {
  let tmpBinBothLhs$1 = a;
  if (!a) {
    tmpBinBothLhs$1 = 0;
  }
  let tmpBinBothLhs = undefined;
  if (b) {
    tmpBinBothLhs = tmpBinBothLhs$1 + b;
  } else {
    tmpBinBothLhs = tmpBinBothLhs$1 + 0;
  }
  if (c) {
    const tmpClusterSSA_tmpReturnArg = tmpBinBothLhs + c;
    return tmpClusterSSA_tmpReturnArg;
  } else {
    const tmpClusterSSA_tmpReturnArg$1 = tmpBinBothLhs + 0;
    return tmpClusterSSA_tmpReturnArg$1;
  }
};
testArgsParameterShadowingBind(10, 20, 30);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = b[ 0 ];
  const e = $dotCall( $function_bind, f, "bind", null, d );
  const g = $dotCall( $function_bind, f, "bind", null, 1, 2 );
  const h = $dotCall( $function_bind, f, "bind", null );
  const i = b[ 1 ];
  const j = b[ 2 ];
  const k = e( i, j );
  const l = b[ 2 ];
  const m = g( l );
  const n = b[ 0 ];
  const o = b[ 1 ];
  const p = b[ 2 ];
  const q = h( n, o, p );
  $( k, m, q );
  return undefined;
};
const f = function r($$0,$$1,$$2 ) {
  const s = $$0;
  const t = $$1;
  const u = $$2;
  debugger;
  let v = s;
  if (s) {

  }
  else {
    v = 0;
  }
  let w = undefined;
  if (t) {
    w = v + t;
  }
  else {
    w = v + 0;
  }
  if (u) {
    const x = w + u;
    return x;
  }
  else {
    const y = w + 0;
    return y;
  }
};
a( 10, 20, 30 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsParameterShadowingBind = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const args = tmpPrevalAliasArgumentsAny;
  const tmpMCF = testTarget.bind;
  const tmpMCP = args[0];
  const bound1 = $dotCall(tmpMCF, testTarget, `bind`, null, tmpMCP);
  const tmpMCF$1 = testTarget.bind;
  const bound2 = $dotCall(tmpMCF$1, testTarget, `bind`, null, 1, 2);
  const tmpMCF$3 = testTarget.bind;
  const bound3 = $dotCall(tmpMCF$3, testTarget, `bind`, null);
  const tmpCallCallee = bound1;
  let tmpCalleeParam = args[1];
  let tmpCalleeParam$1 = args[2];
  const result1 = bound1(tmpCalleeParam, tmpCalleeParam$1);
  const tmpCallCallee$1 = bound2;
  let tmpCalleeParam$3 = args[2];
  const result2 = bound2(tmpCalleeParam$3);
  const tmpCallCallee$3 = bound3;
  let tmpCalleeParam$5 = args[0];
  let tmpCalleeParam$7 = args[1];
  let tmpCalleeParam$9 = args[2];
  const result3 = bound3(tmpCalleeParam$5, tmpCalleeParam$7, tmpCalleeParam$9);
  $(result1, result2, result3);
  return undefined;
};
let testTarget = function ($$0, $$1, $$2) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  let tmpBinBothLhs$1 = a;
  if (tmpBinBothLhs$1) {
  } else {
    tmpBinBothLhs$1 = 0;
  }
  let tmpBinBothRhs$1 = b;
  if (tmpBinBothRhs$1) {
  } else {
    tmpBinBothRhs$1 = 0;
  }
  const tmpBinBothLhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
  let tmpBinBothRhs = c;
  if (tmpBinBothRhs) {
  } else {
    tmpBinBothRhs = 0;
  }
  const tmpReturnArg = tmpBinBothLhs + tmpBinBothRhs;
  return tmpReturnArg;
};
testArgsParameterShadowingBind(10, 20, 30);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) access object property that also exists on prototype? $function_bind
- (todo) this may support .call .apply and .bind but I think that different reducers should tackle it
- (todo) type trackeed tricks can possibly support static $function_bind


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 60, 33, 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
