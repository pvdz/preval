# Preval test case

# find_this_value.md

> Array methods > FindIndex > Ai > Find this value
>
> Test: Array.findIndex with arrow function (no thisArg binding)

## Input

`````js filename=intro
let ctx = {mult: 2};
let result = [];
const x = [1,2,3].findIndex((x) => { result.push(typeof this); }, ctx);
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [`undefined`, `undefined`, `undefined`];
$(result, -1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`undefined`, `undefined`, `undefined`], -1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "undefined", "undefined", "undefined" ];
$( a, -1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let ctx = { mult: 2 };
let result = [];
const tmpMCOO = [1, 2, 3];
const tmpMCF = tmpMCOO.findIndex;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  const tmpMCF$1 = result.push;
  const tmpMCP$1 = `undefined`;
  $dotCall(tmpMCF$1, result, `push`, tmpMCP$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `findIndex`, tmpMCP, ctx);
$(result, x);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_push
- (todo) array reads var statement with init ObjectExpression
- (todo) do we want to support ArrayExpression as expression statement in free loops?
- (todo) objects in isFree check
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_findIndex


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['undefined', 'undefined', 'undefined'], -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
