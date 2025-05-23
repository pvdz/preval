# Preval test case

# stmt_logical_and_eq.md

> Logical > Compound > Member > Stmt > Stmt logical and eq
>
>

## Input

`````js filename=intro
let b = $({c: 1});
if ($(true)) b.c &&= $('b');
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
const b = $({ c: 1 });
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
const a = { c: 1 };
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { c: 1 };
let b = $(tmpCalleeParam);
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 = b.c;
  if (tmpIfTest$1) {
    const tmpAssignMemLhsObj = b;
    const tmpAssignMemRhs = $(`b`);
    tmpAssignMemLhsObj.c = tmpAssignMemRhs;
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
 - 1: { c: '1' }
 - 2: true
 - 3: 'b'
 - 4: { c: '"b"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
