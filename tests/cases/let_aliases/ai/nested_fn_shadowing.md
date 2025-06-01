# Preval test case

# nested_fn_shadowing.md

> Let aliases > Ai > Nested fn shadowing
>
> Assignment to a variable with the same name as let, but in a function (should alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
(function() {
  let x = 123;
})();
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
let x = $(`val`);
const a = x;
const tmpCallComplexCallee = function () {
  debugger;
  let x$1 = 123;
  return undefined;
};
tmpCallComplexCallee();
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
