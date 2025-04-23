# Preval test case

# stmt_logical_or_eq.md

> Logical > Compound > Member > Stmt > Stmt logical or eq
>
>

## Input

`````js filename=intro
let b = $({c: 1});
if ($(true)) b.c ||= $('b');
$(b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { c: 1 };
const b /*:unknown*/ = $(tmpCalleeParam);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = b.c;
  if (tmpIfTest$1) {
    $(b);
  } else {
    const tmpAssignMemRhs /*:unknown*/ = $(`b`);
    b.c = tmpAssignMemRhs;
    $(b);
  }
} else {
  $(b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = $({ c: 1 });
if ($(true)) {
  if (b.c) {
    $(b);
  } else {
    b.c = $(`b`);
    $(b);
  }
} else {
  $(b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = $( true );
if (c) {
  const d = b.c;
  if (d) {
    $( b );
  }
  else {
    const e = $( "b" );
    b.c = e;
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
 - 1: { c: '1' }
 - 2: true
 - 3: { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
