# Preval test case

# some_undefined_values.md

> Array methods > Every > Ai > Some undefined values
>
> Test: Array.every on array with undefined values

## Input

`````js filename=intro
let arr = [undefined,2,undefined];
const x = arr.every(function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
$(undefined);
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [undefined, 2, undefined];
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
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $array_every


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
