# Preval test case

# function_decl_between.md

> Let aliases > Ai > Function decl between
>
> Function declaration between aliases (should not block aliasing)

## Input

`````js filename=intro
let x = $("val");
const a = x;
function noop() {}
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
let noop = function () {
  debugger;
  return undefined;
};
let x = $(`val`);
const a = x;
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
