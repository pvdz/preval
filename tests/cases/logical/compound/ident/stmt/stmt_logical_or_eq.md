# Preval test case

# stmt_logical_or_eq.md

> Logical > Compound > Ident > Stmt > Stmt logical or eq
>
>

## Input

`````js filename=intro
let b = $(1);
if ($(true)) b ||= $('b');
$(b);
`````


## Settled


`````js filename=intro
const b /*:unknown*/ = $(1);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  if (b) {
    $(b);
  } else {
    const tmpClusterSSA_b /*:unknown*/ = $(`b`);
    $(tmpClusterSSA_b);
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
    $(b);
  } else {
    $($(`b`));
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
    $( a );
  }
  else {
    const c = $( "b" );
    $( c );
  }
}
else {
  $( a );
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
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
