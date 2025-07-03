# Preval test case

# find_sparse_multiple.md

> Array methods > FindIndex > Ai > Find sparse multiple
>
> Test: Array.findIndex on sparse array with multiple holes

## Input

`````js filename=intro
let arr = [1,,3,,5];
const x = arr.findIndex(function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
$(1);
$(undefined);
$(3);
$(undefined);
$(5);
$(-1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(undefined);
$(3);
$(undefined);
$(5);
$(-1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( undefined );
$( 3 );
$( undefined );
$( 5 );
$( -1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, , 3, , 5];
const tmpMCF = arr.findIndex;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  $(x$1);
  return undefined;
};
const x = $dotCall(tmpMCF, arr, `findIndex`, tmpMCP);
$(x);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) regular property access of an ident feels tricky;
- (todo) type trackeed tricks can possibly support static $array_findIndex


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: 3
 - 4: undefined
 - 5: 5
 - 6: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
