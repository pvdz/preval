# Preval test case

# ssa_if_hoisting_loop18.md

> If hoisting > Ai > Ssa if hoisting loop18
>
> Test if_hoisting and SSA infinite loop: identical var declarations with unary expressions

## Input

`````js filename=intro
const negate = $("negate");
if (negate) {
  let unary1 = -42;
  $(unary1);
} else {
  let unary2 = -42;
  $(unary2);
}
`````


## Settled


`````js filename=intro
$(`negate`);
$(-42);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`negate`);
$(-42);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "negate" );
$( -42 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const negate = $(`negate`);
if (negate) {
  let unary1 = -42;
  $(unary1);
} else {
  let unary2 = -42;
  $(unary2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'negate'
 - 2: -42
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
