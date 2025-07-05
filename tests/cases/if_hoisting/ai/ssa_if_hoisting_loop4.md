# Preval test case

# ssa_if_hoisting_loop4.md

> If hoisting > Ai > Ssa if hoisting loop4
>
> Test if_hoisting and SSA infinite loop: identical var declarations with function calls

## Input

`````js filename=intro
const test = $("test");
if (test) {
  let value = Math.floor(3.14);
  $(value);
} else {
  let data = Math.floor(3.14);
  $(data);
}
`````


## Settled


`````js filename=intro
$(`test`);
$(3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`test`);
$(3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "test" );
$( 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const test = $(`test`);
if (test) {
  const tmpMCF = $Math_floor;
  let value = 3;
  $(value);
} else {
  const tmpMCF$1 = $Math_floor;
  let data = 3;
  $(data);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'test'
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
