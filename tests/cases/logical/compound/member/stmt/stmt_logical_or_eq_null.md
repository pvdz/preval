# Preval test case

# stmt_logical_or_eq_null.md

> Logical > Compound > Member > Stmt > Stmt logical or eq null
>
>

## Input

`````js filename=intro
let b = $({c: null});
if ($(true)) b.c ||= $('b');
$(b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { c: null };
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
const b = $({ c: null });
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
const a = { c: null };
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { c: null };
let b = $(tmpCalleeParam);
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpIfTest$1 = b.c;
  if (tmpIfTest$1) {
    $(b);
  } else {
    const tmpAssignMemLhsObj = b;
    const tmpAssignMemRhs = $(`b`);
    tmpAssignMemLhsObj.c = tmpAssignMemRhs;
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
 - 1: { c: 'null' }
 - 2: true
 - 3: 'b'
 - 4: { c: '"b"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
