# Preval test case

# some_this_value.md

> Array methods > Filter > Ai > Some this value
>
> Test: Array.filter with arrow function (no thisArg binding)

## Input

`````js filename=intro
let ctx = {mult: 2};
let result = [];
const x = [1,2,3].filter((x) => { result.push(typeof this); }, ctx);
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [`undefined`, `undefined`, `undefined`];
const tmpLambdaFilterOut /*:array*/ /*truthy*/ = [];
$(result, tmpLambdaFilterOut);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`undefined`, `undefined`, `undefined`], []);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "undefined", "undefined", "undefined" ];
const b = [];
$( a, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let ctx = { mult: 2 };
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.filter;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  const tmpMCP$1 = `undefined`;
  $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `filter`, tmpMCP, ctx);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init ObjectExpression
- (todo) do we want to support Literal as expression statement in free loops?
- (todo) fixme: spyless vars and labeled nodes
- (todo) objects in isFree check
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_filter


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['undefined', 'undefined', 'undefined'], []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
