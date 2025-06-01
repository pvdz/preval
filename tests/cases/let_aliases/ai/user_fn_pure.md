# Preval test case

# user_fn_pure.md

> Let aliases > Ai > User fn pure
>
> Call to a user-defined pure function between aliases (should alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
function pure() { return 1; }
pure();
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
$(x, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let pure = function () {
  debugger;
  return 1;
};
let x = $(`val`);
const a = x;
pure();
const b = x;
$(a, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
