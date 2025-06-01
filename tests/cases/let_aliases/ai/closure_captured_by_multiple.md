# Preval test case

# closure_captured_by_multiple.md

> Let aliases > Ai > Closure captured by multiple
>
> Mutation in a closure captured by multiple functions (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
function f() { x = "changed"; }
function g() { f(); }
g();
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, `changed`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`val`), `changed`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, "changed" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  x = `changed`;
  return undefined;
};
let g = function () {
  debugger;
  f();
  return undefined;
};
let x = $(`val`);
const a = x;
g();
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
 - 2: 'val', 'changed'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
