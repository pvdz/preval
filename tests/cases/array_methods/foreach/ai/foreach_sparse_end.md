# Preval test case

# foreach_sparse_end.md

> Array methods > Foreach > Ai > Foreach sparse end
>
> Test: Array.forEach on sparse array with hole at end

## Input

`````js filename=intro
// Input: [1,2,].forEach(fn)
// Expected: fn called for present elements only
let arr = [1,2,];
arr.forEach(function(x) { $(x); });
`````


## Settled


`````js filename=intro
$(1);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2];
const tmpMCF = arr.forEach;
const tmpMCP = function ($$0) {
  let x = $$0;
  debugger;
  $(x);
  return undefined;
};
$dotCall(tmpMCF, arr, `forEach`, tmpMCP);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_forEach


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
