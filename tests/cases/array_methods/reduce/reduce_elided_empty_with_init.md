# Preval test case

# reduce_elided_empty_with_init.md

> Array methods > Reduce > Reduce elided empty with init
>
> When the array only has elided elements, reduce still throws a type error if it has no init

## Input

`````js filename=intro
let result = [];
const x = [,,,,,,].reduce(function(x) { result.push(this === undefined); }, 100);
$(result, x);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [];
$(result, 100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([], 100);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a, 100 );
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
const x = $dotCall(tmpMCF, tmpMCOO, `reduce`, tmpMCP, 100);
$(result, x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
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
 - 1: [], 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
