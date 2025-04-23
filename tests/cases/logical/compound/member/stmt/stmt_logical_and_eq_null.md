# Preval test case

# stmt_logical_and_eq_null.md

> Logical > Compound > Member > Stmt > Stmt logical and eq null
>
>

## Input

`````js filename=intro
let b = $({c: null});
if ($(true)) b.c &&= $('b');
$(b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { c: null };
const b /*:unknown*/ = $(tmpCalleeParam);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = b.c;
  if (tmpIfTest$1) {
    const tmpAssignMemRhs /*:unknown*/ = $(`b`);
    b.c = tmpAssignMemRhs;
    $(b);
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
const b = $({ c: null });
if ($(true)) {
  if (b.c) {
    b.c = $(`b`);
    $(b);
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
const a = { c: null };
const b = $( a );
const c = $( true );
if (c) {
  const d = b.c;
  if (d) {
    const e = $( "b" );
    b.c = e;
    $( b );
  }
  else {
    $( b );
  }
}
else {
  $( b );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { c: 'null' }
 - 2: true
 - 3: { c: 'null' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
