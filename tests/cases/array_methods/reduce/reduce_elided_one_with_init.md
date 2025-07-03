# Preval test case

# reduce_elided_one_with_init.md

> Array methods > Reduce > Reduce elided one with init
>
> When the array only has one elements and otherwise elided elements and is called with ini, the callback should be called as usual

## Input

`````js filename=intro
let result = [];
const x = [,,,100,,,].reduce((a,b) => { $(a,b); return a+b; }, 10);
$(result, x);
`````


## Settled


`````js filename=intro
$(10, 100);
const result /*:array*/ /*truthy*/ = [];
$(result, 110);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10, 100);
$([], 110);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10, 100 );
const a = [];
$( a, 110 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let result = [];
const tmpMCOO = [, , , 100, , ,];
const tmpMCF = tmpMCOO.reduce;
const tmpMCP = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  $(a, b);
  const tmpReturnArg = a + b;
  return tmpReturnArg;
};
const x = $dotCall(tmpMCF, tmpMCOO, `reduce`, tmpMCP, 10);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $array_reduce


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10, 100
 - 2: [], 110
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
