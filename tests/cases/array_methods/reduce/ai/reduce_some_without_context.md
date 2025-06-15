# Preval test case

# reduce_some_without_context.md

> Array methods > Reduce > Ai > Reduce some without context
>
> Test: Array.reduce without context

## Input

`````js filename=intro
let result = [];
const x = [1,2,3].reduce(function(x) { result.push(this === undefined); });
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
const tmpMCP /*:(unused)=>undefined*/ = function ($$0) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpMCP$1 /*:boolean*/ = tmpPrevalAliasThis === undefined;
  $dotCall($array_push, result, `push`, tmpMCP$1);
  return undefined;
};
const tmpMCOO /*:array*/ /*truthy*/ = [1, 2, 3];
let tmpSSA_tmpClusterSSA_tmpLambdaReduceOut /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined, 1, 2, 1, tmpMCOO);
const tmpLambdaReduceHas$2 /*:boolean*/ = 2 in tmpMCOO;
const tmpLambdaReduce1st /*:object*/ /*truthy*/ = {};
if (tmpLambdaReduceHas$2) {
  const tmpLambdaReduceVal$2 /*:primitive*/ = tmpMCOO[2];
  const tmpLambdaReduceBad$2 /*:boolean*/ = tmpSSA_tmpClusterSSA_tmpLambdaReduceOut === tmpLambdaReduce1st;
  if (tmpLambdaReduceBad$2) {
    tmpSSA_tmpClusterSSA_tmpLambdaReduceOut = tmpLambdaReduceVal$2;
  } else {
    tmpSSA_tmpClusterSSA_tmpLambdaReduceOut = $dotCall(
      tmpMCP,
      undefined,
      undefined,
      tmpSSA_tmpClusterSSA_tmpLambdaReduceOut,
      tmpLambdaReduceVal$2,
      2,
      tmpMCOO,
    );
  }
} else {
}
const tmpLambdaReduceTTE /*:boolean*/ = tmpSSA_tmpClusterSSA_tmpLambdaReduceOut === tmpLambdaReduce1st;
if (tmpLambdaReduceTTE) {
  const tmpLambdaReduceErr /*:object*/ /*truthy*/ = new $typeError_constructor(
    `[Preval] Called .reduce without init on an array without values: \`const\\nx\\n=\\n\$dotCall(\$array_reduce,\\ntmpMCOO,\\n\`reduce\`,\\ntmpMCP);\``,
  );
  throw tmpLambdaReduceErr;
} else {
  $(result, tmpSSA_tmpClusterSSA_tmpLambdaReduceOut);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const result = [];
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  $dotCall($array_push, result, `push`, tmpPrevalAliasThis === undefined);
};
const tmpMCOO = [1, 2, 3];
let tmpSSA_tmpClusterSSA_tmpLambdaReduceOut = $dotCall(tmpMCP, undefined, undefined, 1, 2, 1, tmpMCOO);
const tmpLambdaReduceHas$2 = 2 in tmpMCOO;
const tmpLambdaReduce1st = {};
if (tmpLambdaReduceHas$2) {
  const tmpLambdaReduceVal$2 = tmpMCOO[2];
  if (tmpSSA_tmpClusterSSA_tmpLambdaReduceOut === tmpLambdaReduce1st) {
    tmpSSA_tmpClusterSSA_tmpLambdaReduceOut = tmpLambdaReduceVal$2;
  } else {
    tmpSSA_tmpClusterSSA_tmpLambdaReduceOut = $dotCall(
      tmpMCP,
      undefined,
      undefined,
      tmpSSA_tmpClusterSSA_tmpLambdaReduceOut,
      tmpLambdaReduceVal$2,
      2,
      tmpMCOO,
    );
  }
}
if (tmpSSA_tmpClusterSSA_tmpLambdaReduceOut === tmpLambdaReduce1st) {
  const tmpLambdaReduceErr = new $typeError_constructor(
    `[Preval] Called .reduce without init on an array without values: \`const\\nx\\n=\\n\$dotCall(\$array_reduce,\\ntmpMCOO,\\n\`reduce\`,\\ntmpMCP);\``,
  );
  throw tmpLambdaReduceErr;
} else {
  $(result, tmpSSA_tmpClusterSSA_tmpLambdaReduceOut);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = function($$0 ) {
  const c = this;
  debugger;
  const d = c === undefined;
  $dotCall( $array_push, a, "push", d );
  return undefined;
};
const e = [ 1, 2, 3 ];
let f = $dotCall( b, undefined, undefined, 1, 2, 1, e );
const g = 2 in e;
const h = {};
if (g) {
  const i = e[ 2 ];
  const j = f === h;
  if (j) {
    f = i;
  }
  else {
    f = $dotCall( b, undefined, undefined, f, i, 2, e );
  }
}
const k = f === h;
if (k) {
  const l = new $typeError_constructor( "[Preval] Called .reduce without init on an array without values: `const\\nx\\n=\\n$dotCall($array_reduce,\\ntmpMCOO,\\n`reduce`,\\ntmpMCP);`" );
  throw l;
}
else {
  $( a, f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.reduce;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  const tmpMCP$1 = tmpPrevalAliasThis === undefined;
  $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `reduce`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
- (todo) objects in isFree check
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_reduce


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [true, true], undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
