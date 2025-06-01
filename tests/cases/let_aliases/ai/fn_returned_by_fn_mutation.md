# Preval test case

# fn_returned_by_fn_mutation.md

> Let aliases > Ai > Fn returned by fn mutation
>
> Mutation in a function returned by another function (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
function makeMutator() {
  return function() { x = "changed"; };
}
const mutator = makeMutator();
mutator();
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
const mutator = makeMutator();
mutator();
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
