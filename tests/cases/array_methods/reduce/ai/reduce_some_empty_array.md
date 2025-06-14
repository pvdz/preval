# Preval test case

# reduce_some_empty_array.md

> Array methods > Reduce > Ai > Reduce some empty array
>
> Test: Array.reduce on empty array

## Input

`````js filename=intro
let result = [];
const x = [].reduce(function(x) { result.push(x); });
$(result, x);
`````


## Settled


`````js filename=intro
const tmpArreerr /*:object*/ /*truthy*/ = new $typeError_constructor(
  `[Preval] Called .reduce without init on an array without values: \`const\\nx\\n=\\n\$dotCall(\$array_reduce,\\ntmpMCOO,\\n\`reduce\`,\\ntmpMCP);\``,
);
throw tmpArreerr;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArreerr = new $typeError_constructor(
  `[Preval] Called .reduce without init on an array without values: \`const\\nx\\n=\\n\$dotCall(\$array_reduce,\\ntmpMCOO,\\n\`reduce\`,\\ntmpMCP);\``,
);
throw tmpArreerr;
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
const tmpMCOO = [];
const tmpMCF = tmpMCOO.reduce;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  $dotCall(tmpMCF$1, result, `push`, x$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `reduce`, tmpMCP);
$(result, x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) support array reads statement type EmptyStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
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
