# Preval test case

# stmt_logical_qq_eq.md

> Logical > Compound > Ident > Stmt > Stmt logical qq eq
>
>

## Input

`````js filename=intro
let b = $(1);
if ($(true)) b ??= $('b');
$(b);
`````


## Settled


`````js filename=intro
const b /*:unknown*/ = $(1);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 /*:boolean*/ = b == null;
  if (tmpIfTest$1) {
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
  if (b == null) {
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
  const c = a == null;
  if (c) {
    const d = $( "b" );
    $( d );
  }
  else {
    $( a );
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
