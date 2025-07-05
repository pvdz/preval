# Preval test case

# ssa_if_hoisting_loop8.md

> If hoisting > Ai > Ssa if hoisting loop8
>
> Test if_hoisting and SSA infinite loop: identical var declarations with boolean literals

## Input

`````js filename=intro
const active = $("active");
if (active) {
  let bool1 = true;
  $(bool1);
} else {
  let bool2 = true;
  $(bool2);
}
`````


## Settled


`````js filename=intro
$(`active`);
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`active`);
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "active" );
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const active = $(`active`);
if (active) {
  let bool1 = true;
  $(bool1);
} else {
  let bool2 = true;
  $(bool2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'active'
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
