# Preval test case

# closure_assign_between.md

> Let aliases > Ai > Closure assign between
>
> Assignment to a closure variable between aliases (should not alias if closure mutation is considered a side effect)

## Input

`````js filename=intro
let x = $("val");
function mutate() { x = "other"; }
const a = x;
mutate();
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, `other`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`val`), `other`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, "other" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let mutate = function () {
  debugger;
  x = `other`;
  return undefined;
};
let x = $(`val`);
const a = x;
mutate();
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
 - 2: 'val', 'other'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
