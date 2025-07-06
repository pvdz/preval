# Preval test case

# arguments_call_variations.md

> Arguments > Ai > Arguments call variations
>
> Test various call patterns with arguments

## Input

`````js filename=intro
function testCallVariations() {
  const args = arguments;
  const result1 = testTarget.call(null, args[0], args[1], args[2]);
  const result2 = testTarget.call(null, 1, 2, 3);
  const result3 = testTarget.call(null);
  const result4 = testTarget.call(null, args[0]);
  $(result1, result2, result3, result4);
}

function testTarget(a, b, c) {
  return (a || 0) + (b || 0) + (c || 0);
}

testCallVariations(10, 20, 30);
`````


## Settled


`````js filename=intro
const testCallVariations /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const tmpMCP /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  const tmpMCP$1 /*:unknown*/ = tmpPrevalAliasArgumentsAny[1];
  const tmpMCP$3 /*:unknown*/ = tmpPrevalAliasArgumentsAny[2];
  const result1 /*:primitive*/ = testTarget(tmpMCP, tmpMCP$1, tmpMCP$3);
  const tmpMCP$5 /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  const result4 /*:primitive*/ = testTarget(tmpMCP$5);
  $(result1, 6, 0, result4);
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
testCallVariations(10, 20, 30);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testCallVariations = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpMCP = tmpPrevalAliasArgumentsAny[0];
  $(testTarget(tmpMCP, tmpPrevalAliasArgumentsAny[1], tmpPrevalAliasArgumentsAny[2]), 6, 0, testTarget(tmpPrevalAliasArgumentsAny[0]));
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
testCallVariations(10, 20, 30);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = b[ 0 ];
  const e = b[ 1 ];
  const f = b[ 2 ];
  const g = h( d, e, f );
  const i = b[ 0 ];
  const j = h( i );
  $( g, 6, 0, j );
  return undefined;
};
const h = function $pcompiled($$0,$$1,$$2 ) {
  const k = $$0;
  const l = $$1;
  const m = $$2;
  debugger;
  let n = k;
  if (k) {

  }
  else {
    n = 0;
  }
  let o = undefined;
  if (l) {
    o = n + l;
  }
  else {
    o = n + 0;
  }
  if (m) {
    const p = o + m;
    return p;
  }
  else {
    const q = o + 0;
    return q;
  }
};
a( 10, 20, 30 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testCallVariations = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const args = tmpPrevalAliasArgumentsAny;
  const tmpMCF = testTarget.call;
  const tmpMCP = args[0];
  const tmpMCP$1 = args[1];
  const tmpMCP$3 = args[2];
  const result1 = $dotCall(tmpMCF, testTarget, `call`, null, tmpMCP, tmpMCP$1, tmpMCP$3);
  const tmpMCF$1 = testTarget.call;
  const result2 = $dotCall(tmpMCF$1, testTarget, `call`, null, 1, 2, 3);
  const tmpMCF$3 = testTarget.call;
  const result3 = $dotCall(tmpMCF$3, testTarget, `call`, null);
  const tmpMCF$5 = testTarget.call;
  const tmpMCP$5 = args[0];
  const result4 = $dotCall(tmpMCF$5, testTarget, `call`, null, tmpMCP$5);
  $(result1, result2, result3, result4);
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
testCallVariations(10, 20, 30);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) access object property that also exists on prototype? $function_call
- (todo) inline arguments when function does not have that many params yet


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 60, 6, 0, 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
