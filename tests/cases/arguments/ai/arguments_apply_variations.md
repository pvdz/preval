# Preval test case

# arguments_apply_variations.md

> Arguments > Ai > Arguments apply variations
>
> Test various apply patterns with arguments

## Input

`````js filename=intro
function testApplyVariations() {
  const args = arguments;
  const result1 = testTarget.apply(null, args);
  const result2 = testTarget.apply(null, [1, 2, 3]);
  const result3 = testTarget.apply(null, []);
  const result4 = testTarget.apply(null, [args[0]]);
  $(result1, result2, result3, result4);
}

function testTarget(a, b, c) {
  return (a || 0) + (b || 0) + (c || 0);
}

testApplyVariations(10, 20, 30);
`````


## Settled


`````js filename=intro
const testApplyVariations /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const result1 /*:primitive*/ = testTarget(...tmpPrevalAliasArgumentsAny);
  const tmpArrElement /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  const result4 /*:primitive*/ = testTarget(tmpArrElement);
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
testApplyVariations(10, 20, 30);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testApplyVariations = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  $(testTarget(...tmpPrevalAliasArgumentsAny), 6, 0, testTarget(tmpPrevalAliasArgumentsAny[0]));
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
testApplyVariations(10, 20, 30);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = e( ...b );
  const f = b[ 0 ];
  const g = e( f );
  $( d, 6, 0, g );
  return undefined;
};
const e = function h($$0,$$1,$$2 ) {
  const i = $$0;
  const j = $$1;
  const k = $$2;
  debugger;
  let l = i;
  if (i) {

  }
  else {
    l = 0;
  }
  let m = undefined;
  if (j) {
    m = l + j;
  }
  else {
    m = l + 0;
  }
  if (k) {
    const n = m + k;
    return n;
  }
  else {
    const o = m + 0;
    return o;
  }
};
a( 10, 20, 30 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testApplyVariations = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const args = tmpPrevalAliasArgumentsAny;
  const tmpMCF = testTarget.apply;
  const result1 = $dotCall(tmpMCF, testTarget, `apply`, null, args);
  const tmpMCF$1 = testTarget.apply;
  const tmpMCP = [1, 2, 3];
  const result2 = $dotCall(tmpMCF$1, testTarget, `apply`, null, tmpMCP);
  const tmpMCF$3 = testTarget.apply;
  const tmpMCP$1 = [];
  const result3 = $dotCall(tmpMCF$3, testTarget, `apply`, null, tmpMCP$1);
  const tmpMCF$5 = testTarget.apply;
  const tmpArrElement = args[0];
  const tmpMCP$3 = [tmpArrElement];
  const result4 = $dotCall(tmpMCF$5, testTarget, `apply`, null, tmpMCP$3);
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
testApplyVariations(10, 20, 30);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) access object property that also exists on prototype? $function_apply
- (todo) array reads var statement with init CallExpression
- (todo) harden the check for being an arguments object, a prefix check seems brittle


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
