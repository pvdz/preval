# Preval test case

# returned_fn_called_immediately.md

> Let aliases > Ai > Returned fn called immediately
>
> Returned function called immediately (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
function makeMutator() {
  return function() { x = "changed"; };
}
makeMutator()();
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
let makeMutator = function () {
  debugger;
  const tmpReturnArg = function () {
    debugger;
    x = `changed`;
    return undefined;
  };
  return tmpReturnArg;
};
let x = $(`val`);
const a = x;
const tmpCallComplexCallee = makeMutator();
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
 - 2: 'val', 'changed'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
