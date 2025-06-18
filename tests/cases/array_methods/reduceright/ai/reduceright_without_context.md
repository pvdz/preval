# Preval test case

# reduceright_without_context.md

> Array methods > Reduceright > Ai > Reduceright without context
>
> Test: Array.reduceRight without context

## Input

`````js filename=intro
let result = [];
const x = [1,2,3].reduceRight(function(x) { result.push(this === undefined); });
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
const tmpMCP /*:()=>undefined*/ = function (/*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpMCP$1 /*:boolean*/ = tmpPrevalAliasThis === undefined;
  $dotCall($array_push, result, `push`, tmpMCP$1);
  return undefined;
};
let tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined);
let tmpLambdaReduceRightTTE /*:boolean*/ /*ternaryConst*/ = false;
const tmpLambdaReduceRight1st /*:object*/ /*truthy*/ = {};
const tmpLambdaReduceRightBad$2 /*:boolean*/ = tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut === tmpLambdaReduceRight1st;
if (tmpLambdaReduceRightBad$2) {
  tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut = 1;
} else {
  tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut = $dotCall(tmpMCP, undefined, undefined);
  tmpLambdaReduceRightTTE = tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut === tmpLambdaReduceRight1st;
}
if (tmpLambdaReduceRightTTE) {
  const tmpLambdaReduceRightErr /*:object*/ /*truthy*/ = new $typeError_constructor(
    `[Preval] Called .reduceRight without init on an array without values: \`const\\nx\\n=\\n\$dotCall(\$array_reduceRight,\\ntmpMCOO,\\n\`reduceRight\`,\\ntmpMCP);\``,
  );
  throw tmpLambdaReduceRightErr;
} else {
  $(result, tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const result = [];
const tmpMCP = function () {
  const tmpPrevalAliasThis = this;
  $dotCall($array_push, result, `push`, tmpPrevalAliasThis === undefined);
};
let tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut = $dotCall(tmpMCP, undefined, undefined);
let tmpLambdaReduceRightTTE = false;
const tmpLambdaReduceRight1st = {};
if (tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut === tmpLambdaReduceRight1st) {
  tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut = 1;
} else {
  tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut = $dotCall(tmpMCP, undefined, undefined);
  tmpLambdaReduceRightTTE = tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut === tmpLambdaReduceRight1st;
}
if (tmpLambdaReduceRightTTE) {
  const tmpLambdaReduceRightErr = new $typeError_constructor(
    `[Preval] Called .reduceRight without init on an array without values: \`const\\nx\\n=\\n\$dotCall(\$array_reduceRight,\\ntmpMCOO,\\n\`reduceRight\`,\\ntmpMCP);\``,
  );
  throw tmpLambdaReduceRightErr;
} else {
  $(result, tmpSSA_tmpClusterSSA_tmpLambdaReduceRightOut);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = function() {
  const c = this;
  debugger;
  const d = c === undefined;
  $dotCall( $array_push, a, "push", d );
  return undefined;
};
let e = $dotCall( b, undefined, undefined );
let f = false;
const g = {};
const h = e === g;
if (h) {
  e = 1;
}
else {
  e = $dotCall( b, undefined, undefined );
  f = e === g;
}
if (f) {
  const i = new $typeError_constructor( "[Preval] Called .reduceRight without init on an array without values: `const\\nx\\n=\\n$dotCall($array_reduceRight,\\ntmpMCOO,\\n`reduceRight`,\\ntmpMCP);`" );
  throw i;
}
else {
  $( a, e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.reduceRight;
const tmpMCP = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  const tmpMCP$1 = tmpPrevalAliasThis === undefined;
  $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `reduceRight`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
- (todo) objects in isFree check
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_reduceRight


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
