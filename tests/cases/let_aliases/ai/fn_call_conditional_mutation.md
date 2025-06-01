# Preval test case

# fn_call_conditional_mutation.md

> Let aliases > Ai > Fn call conditional mutation
>
> Function call that mutates let on some paths (should not alias)

## Input

`````js filename=intro
let x = $("val");
const a = x;
function maybeMutate(flag) {
  if (flag) x = "mutated";
}
maybeMutate(true);
const b = x;
$(a, b);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, `mutated`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`val`), `mutated`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, "mutated" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let maybeMutate = function ($$0) {
  let flag = $$0;
  debugger;
  if (flag) {
    x = `mutated`;
    return undefined;
  } else {
    return undefined;
  }
};
let x = $(`val`);
const a = x;
maybeMutate(true);
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
 - 2: 'val', 'mutated'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
