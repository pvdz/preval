# Preval test case

# if_return_else_true.md

> Ref tracking > Last write analysis > If return else true
>
> Last write analysis should pick up on the return and assume that the prior write can not be observed later.

## Input

`````js filename=intro
function f() {
  let x = 1;
  if ($(true)) {
    x = $(1, 'prevent optim');
    return x;
  } else {
    x = $(2, 'prevent optim');
  }
  
  $('prevent return hoisting');
  return x;
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(1, `prevent optim`);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpClusterSSA_x$1 /*:unknown*/ = $(2, `prevent optim`);
  $(`prevent return hoisting`);
  $(tmpClusterSSA_x$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $($(1, `prevent optim`));
} else {
  const tmpClusterSSA_x$1 = $(2, `prevent optim`);
  $(`prevent return hoisting`);
  $(tmpClusterSSA_x$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( 1, "prevent optim" );
  $( b );
}
else {
  const c = $( 2, "prevent optim" );
  $( "prevent return hoisting" );
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    x = $(1, `prevent optim`);
    return x;
  } else {
    x = $(2, `prevent optim`);
    $(`prevent return hoisting`);
    return x;
  }
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 1, 'prevent optim'
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
