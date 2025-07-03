# Preval test case

# every_sparse_array.md

> Array methods > Every > Ai > Every sparse array
>
> Test: Array.every on sparse array

## Input

`````js filename=intro
let arr = [1,,3];
const x = arr.every(function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
$(1);
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, , 3];
const tmpMCF = arr.every;
const tmpMCP = function ($$0) {
  let x$1 = $$0;
  debugger;
  $(x$1);
  return undefined;
};
const x = $dotCall(tmpMCF, arr, `every`, tmpMCP);
$(x);
`````


## Todos triggered


- (todo) Support this binary expression operator:
- (todo) array reads var statement with init BinaryExpression
- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $array_every


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
