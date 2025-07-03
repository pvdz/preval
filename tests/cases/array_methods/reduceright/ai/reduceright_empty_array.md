# Preval test case

# reduceright_empty_array.md

> Array methods > Reduceright > Ai > Reduceright empty array
>
> Test: Array.reduceRight on empty array

## Input

`````js filename=intro
let result = [];
const x = [].reduceRight(function(x) { result.push(x); });
$(result, x);
`````


## Settled


`````js filename=intro
const tmpLambdaReduceRightErr /*:object*/ /*truthy*/ = new $typeError_constructor(
  `[Preval] Called .reduceRight without init on an array without values: \`const\\nx\\n=\\n\$dotCall(\$array_reduceRight,\\ntmpMCOO,\\n\`reduceRight\`,\\ntmpMCP);\``,
);
throw tmpLambdaReduceRightErr;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpLambdaReduceRightErr = new $typeError_constructor(
  `[Preval] Called .reduceRight without init on an array without values: \`const\\nx\\n=\\n\$dotCall(\$array_reduceRight,\\ntmpMCOO,\\n\`reduceRight\`,\\ntmpMCP);\``,
);
throw tmpLambdaReduceRightErr;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $typeError_constructor( "[Preval] Called .reduceRight without init on an array without values: `const\\nx\\n=\\n$dotCall($array_reduceRight,\\ntmpMCOO,\\n`reduceRight`,\\ntmpMCP);`" );
throw a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [];
const tmpMCF = tmpMCOO.reduceRight;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  $dotCall(tmpMCF$1, result, `push`, x$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `reduceRight`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) fixme: spyless vars and labeled nodes
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_reduceRight


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ Reduce of empty array with no initial value ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
