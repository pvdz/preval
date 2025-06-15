# Preval test case

# find_sparse_variety.md

> Array methods > Findlast > Ai > Find sparse variety
>
> Test: Array.findLast on varied sparse array

## Input

`````js filename=intro
let arr = [1,,undefined,4];
const x = arr.findLast(function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
$(4);
$(undefined);
$(undefined);
$(1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
$(undefined);
$(undefined);
$(1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 4 );
$( undefined );
$( undefined );
$( 1 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, , undefined, 4];
const tmpMCF = arr.findLast;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  $(x$1);
  return undefined;
};
const x = $dotCall(tmpMCF, arr, `findLast`, tmpMCP);
$(x);
`````


## Todos triggered


- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_findLast


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 4
 - 2: undefined
 - 3: undefined
 - 4: 1
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
