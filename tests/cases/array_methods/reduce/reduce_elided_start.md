# Preval test case

# reduce_elided_start.md

> Array methods > Reduce > Reduce elided start
>
> When the array has elided elements the init value should be the first non-elided element.

## Input

`````js filename=intro
let result = [];
const x = [,,,1,2,3].reduce(function(x) { result.push(this === undefined); });
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
let tmpSSA_tmpLambdaReduceOut$1 /*:unknown*/ = $dotCall(tmpMCP, undefined, undefined);
let tmpLambdaReduceTTE /*:boolean*/ /*ternaryConst*/ = false;
const tmpLambdaReduce1st /*:object*/ /*truthy*/ = {};
const tmpLambdaReduceBad$1 /*:boolean*/ = tmpSSA_tmpLambdaReduceOut$1 === tmpLambdaReduce1st;
if (tmpLambdaReduceBad$1) {
  tmpSSA_tmpLambdaReduceOut$1 = 3;
} else {
  tmpSSA_tmpLambdaReduceOut$1 = $dotCall(tmpMCP, undefined, undefined);
  tmpLambdaReduceTTE = tmpSSA_tmpLambdaReduceOut$1 === tmpLambdaReduce1st;
}
if (tmpLambdaReduceTTE) {
  const tmpLambdaReduceErr /*:object*/ /*truthy*/ = new $typeError_constructor(
    `[Preval] Called .reduce without init on an array without values: \`const\\nx\\n=\\n\$dotCall(\$array_reduce,\\ntmpMCOO,\\n\`reduce\`,\\ntmpMCP);\``,
  );
  throw tmpLambdaReduceErr;
} else {
  $(result, tmpSSA_tmpLambdaReduceOut$1);
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
let tmpSSA_tmpLambdaReduceOut$1 = $dotCall(tmpMCP, undefined, undefined);
let tmpLambdaReduceTTE = false;
const tmpLambdaReduce1st = {};
if (tmpSSA_tmpLambdaReduceOut$1 === tmpLambdaReduce1st) {
  tmpSSA_tmpLambdaReduceOut$1 = 3;
} else {
  tmpSSA_tmpLambdaReduceOut$1 = $dotCall(tmpMCP, undefined, undefined);
  tmpLambdaReduceTTE = tmpSSA_tmpLambdaReduceOut$1 === tmpLambdaReduce1st;
}
if (tmpLambdaReduceTTE) {
  const tmpLambdaReduceErr = new $typeError_constructor(
    `[Preval] Called .reduce without init on an array without values: \`const\\nx\\n=\\n\$dotCall(\$array_reduce,\\ntmpMCOO,\\n\`reduce\`,\\ntmpMCP);\``,
  );
  throw tmpLambdaReduceErr;
} else {
  $(result, tmpSSA_tmpLambdaReduceOut$1);
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
  e = 3;
}
else {
  e = $dotCall( b, undefined, undefined );
  f = e === g;
}
if (f) {
  const i = new $typeError_constructor( "[Preval] Called .reduce without init on an array without values: `const\\nx\\n=\\n$dotCall($array_reduce,\\ntmpMCOO,\\n`reduce`,\\ntmpMCP);`" );
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
const tmpMCOO = [, , , 1, 2, 3];
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
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) objects in isFree check
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
