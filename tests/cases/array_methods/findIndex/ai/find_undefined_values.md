# Preval test case

# find_undefined_values.md

> Array methods > FindIndex > Ai > Find undefined values
>
> Test: Array.findIndex on array with undefined values

## Input

`````js filename=intro
let arr = [undefined,2,undefined];
const x = arr.findIndex(function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
$(undefined);
$(2);
$(undefined);
$(-1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(2);
$(undefined);
$(-1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 2 );
$( undefined );
$( -1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [undefined, 2, undefined];
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
 - 1: undefined
 - 2: 2
 - 3: undefined
 - 4: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
