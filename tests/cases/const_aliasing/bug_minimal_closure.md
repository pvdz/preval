# Preval test case

# bug_minimal_closure.md

> Const aliasing > Bug minimal closure
>
> Closure: mutation in IIFE after aliasing

## Input

`````js filename=intro
let x = $("val");
const a = x;
(function() {
  x = "changed";
})();
$(a, x);
// Expectation: a === "val", x === "changed". Aliasing is not safe.
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
let x = $(`val`);
const a = x;
const tmpCallComplexCallee = function () {
  debugger;
  x = `changed`;
  return undefined;
};
tmpCallComplexCallee();
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
