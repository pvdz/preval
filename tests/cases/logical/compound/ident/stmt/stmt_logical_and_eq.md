# Preval test case

# stmt_logical_and_eq.md

> Logical > Compound > Ident > Stmt > Stmt logical and eq
>
>

## Input

`````js filename=intro
let b = $(1);
if ($(true)) b &&= $('b');
$(b);
`````


## Settled


`````js filename=intro
const b /*:unknown*/ = $(1);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  if (b) {
    const tmpClusterSSA_b /*:unknown*/ = $(`b`);
    $(tmpClusterSSA_b);
  } else {
    $(b);
  }
} else {
  $(b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = $(1);
if ($(true)) {
  if (b) {
    $($(`b`));
  } else {
    $(b);
  }
} else {
  $(b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( true );
if (b) {
  if (a) {
    const c = $( "b" );
    $( c );
  }
  else {
    $( a );
  }
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = $(1);
const tmpIfTest = $(true);
if (tmpIfTest) {
  if (b) {
    b = $(`b`);
    $(b);
  } else {
    $(b);
  }
} else {
  $(b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: true
 - 3: 'b'
 - 4: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
