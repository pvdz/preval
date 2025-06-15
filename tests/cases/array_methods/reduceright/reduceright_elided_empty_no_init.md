# Preval test case

# reduceright_elided_empty_no_init.md

> Array methods > Reduceright > Reduceright elided empty no init
>
> When the array only has elided elements, reduceRight still throws a type error if it has no init

## Input

`````js filename=intro
let result = [];
const x = [,,,,,,].reduceRight(function(x) { result.push(this === undefined); });
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
const tmpMCOO = [, , , , , ,];
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
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
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
