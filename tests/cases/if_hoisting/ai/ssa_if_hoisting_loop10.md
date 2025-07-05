# Preval test case

# ssa_if_hoisting_loop10.md

> If hoisting > Ai > Ssa if hoisting loop10
>
> Test if_hoisting and SSA infinite loop: identical var declarations with undefined literals

## Input

`````js filename=intro
const loaded = $("loaded");
if (loaded) {
  let undef1 = undefined;
  $(undef1);
} else {
  let undef2 = undefined;
  $(undef2);
}
`````


## Settled


`````js filename=intro
$(`loaded`);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`loaded`);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "loaded" );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const loaded = $(`loaded`);
if (loaded) {
  let undef1 = undefined;
  $(undefined);
} else {
  let undef2 = undefined;
  $(undefined);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'loaded'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
