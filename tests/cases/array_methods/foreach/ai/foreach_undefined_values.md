# Preval test case

# foreach_undefined_values.md

> Array methods > Foreach > Ai > Foreach undefined values
>
> Test: Array.forEach on array with undefined values

## Input

`````js filename=intro
// Input: [undefined,2,undefined].forEach(fn)
// Expected: fn called for all elements (including undefined)
let arr = [undefined,2,undefined];
arr.forEach(function(x) { $(x); });
`````


## Settled


`````js filename=intro
$(undefined);
$(2);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(2);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 2 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [undefined, 2, undefined];
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
 - 1: undefined
 - 2: 2
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
