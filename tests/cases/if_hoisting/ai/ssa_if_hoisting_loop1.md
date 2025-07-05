# Preval test case

# ssa_if_hoisting_loop1.md

> If hoisting > Ai > Ssa if hoisting loop1
>
> Test if_hoisting and SSA infinite loop: identical var declarations in both branches

## Input

`````js filename=intro
const x = $("test");
if (x) {
  let a = 1;
  $(a);
} else {
  let b = 1;
  $(b);
}
`````


## Settled


`````js filename=intro
$(`test`);
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`test`);
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "test" );
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(`test`);
if (x) {
  let a = 1;
  $(a);
} else {
  let b = 1;
  $(b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
