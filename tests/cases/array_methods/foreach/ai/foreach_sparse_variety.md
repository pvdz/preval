# Preval test case

# foreach_sparse_variety.md

> Array methods > Foreach > Ai > Foreach sparse variety
>
> Test: Array.forEach on varied sparse array

## Input

`````js filename=intro
// Input: [1,,undefined,4].forEach(fn)
// Expected: fn called for present elements (including undefined value)
let arr = [1,,undefined,4];
arr.forEach(function(x) { $(x); });
`````


## Settled


`````js filename=intro
$(1);
$(undefined);
$(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(undefined);
$(4);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( undefined );
$( 4 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, , undefined, 4];
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
 - 2: undefined
 - 3: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
