# Preval test case

# if_return_else_false.md

> Ref tracking > Last write analysis > If return else false
>
> Last write analysis should pick up on the return and assume that the prior write can not be observed later.

## Input

`````js filename=intro
function f() {
  let x = 1;
  if ($(false)) {
    x = $(2, 'prevent optim');
    return x;
  } else {
    x = $(3, 'prevent optim');
  }
  
  $('prevent return hoisting');
  return x;
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(false);
if (tmpIfTest) {
  const tmpClusterSSA_x /*:unknown*/ = $(2, `prevent optim`);
  $(tmpClusterSSA_x);
} else {
  const tmpClusterSSA_x$1 /*:unknown*/ = $(3, `prevent optim`);
  $(`prevent return hoisting`);
  $(tmpClusterSSA_x$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(false)) {
  $($(2, `prevent optim`));
} else {
  const tmpClusterSSA_x$1 = $(3, `prevent optim`);
  $(`prevent return hoisting`);
  $(tmpClusterSSA_x$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  const b = $( 2, "prevent optim" );
  $( b );
}
else {
  const c = $( 3, "prevent optim" );
  $( "prevent return hoisting" );
  $( c );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: 3, 'prevent optim'
 - 3: 'prevent return hoisting'
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
