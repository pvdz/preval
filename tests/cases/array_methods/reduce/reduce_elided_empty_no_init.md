# Preval test case

# reduce_elided_empty_no_init.md

> Array methods > Reduce > Reduce elided empty no init
>
> When the array only has elided elements, reduce still throws a type error if it has no init

## Input

`````js filename=intro
let result = [];
const x = [,,,,,,].reduce(function(x) { result.push(this === undefined); });
$(result, x);
`````


## Settled


`````js filename=intro
const tmpLambdaReduceErr /*:object*/ /*truthy*/ = new $typeError_constructor(
  `[Preval] Called .reduce without init on an array without values: \`const\\nx\\n=\\n\$dotCall(\$array_reduce,\\ntmpMCOO,\\n\`reduce\`,\\ntmpMCP);\``,
);
throw tmpLambdaReduceErr;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpLambdaReduceErr = new $typeError_constructor(
  `[Preval] Called .reduce without init on an array without values: \`const\\nx\\n=\\n\$dotCall(\$array_reduce,\\ntmpMCOO,\\n\`reduce\`,\\ntmpMCP);\``,
);
throw tmpLambdaReduceErr;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $typeError_constructor( "[Preval] Called .reduce without init on an array without values: `const\\nx\\n=\\n$dotCall($array_reduce,\\ntmpMCOO,\\n`reduce`,\\ntmpMCP);`" );
throw a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [, , , , , ,];
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
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_reduce


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ Reduce of empty array with no initial value ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
