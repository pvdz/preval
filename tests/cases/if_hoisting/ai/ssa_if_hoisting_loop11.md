# Preval test case

# ssa_if_hoisting_loop11.md

> If hoisting > Ai > Ssa if hoisting loop11
>
> Test if_hoisting and SSA infinite loop: nested if statements with identical vars

## Input

`````js filename=intro
const outer = $("outer");
const inner = $("inner");
if (outer) {
  if (inner) {
    let nested1 = 100;
    $(nested1);
  } else {
    let nested2 = 100;
    $(nested2);
  }
} else {
  if (inner) {
    let nested3 = 100;
    $(nested3);
  } else {
    let nested4 = 100;
    $(nested4);
  }
}
`````


## Settled


`````js filename=intro
$(`outer`);
$(`inner`);
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`outer`);
$(`inner`);
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "outer" );
$( "inner" );
$( 100 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const outer = $(`outer`);
const inner = $(`inner`);
if (outer) {
  if (inner) {
    let nested1 = 100;
    $(nested1);
  } else {
    let nested2 = 100;
    $(nested2);
  }
} else {
  if (inner) {
    let nested3 = 100;
    $(nested3);
  } else {
    let nested4 = 100;
    $(nested4);
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'outer'
 - 2: 'inner'
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
