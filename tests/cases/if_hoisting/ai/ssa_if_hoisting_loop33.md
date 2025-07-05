# Preval test case

# ssa_if_hoisting_loop33.md

> If hoisting > Ai > Ssa if hoisting loop33
>
> Test if_hoisting and SSA infinite loop: identical vars with same name assignments

## Input

`````js filename=intro
const same = $("same");
if (same) {
  let shared = 1000;
  $(shared);
  shared = 2000;
  $(shared);
} else {
  let shared = 1000;
  $(shared);
  shared = 2000;
  $(shared);
}
`````


## Settled


`````js filename=intro
$(`same`);
$(1000);
$(2000);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`same`);
$(1000);
$(2000);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "same" );
$( 1000 );
$( 2000 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const same = $(`same`);
if (same) {
  let shared = 1000;
  $(shared);
  shared = 2000;
  $(shared);
} else {
  let shared$1 = 1000;
  $(shared$1);
  shared$1 = 2000;
  $(shared$1);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'same'
 - 2: 1000
 - 3: 2000
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
