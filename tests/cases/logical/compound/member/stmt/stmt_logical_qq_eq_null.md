# Preval test case

# stmt_logical_qq_eq_null.md

> Logical > Compound > Member > Stmt > Stmt logical qq eq null
>
>

## Input

`````js filename=intro
let b = $({c: null});
if ($(true)) b.c ??= $('b');
$(b);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { c: null };
const b /*:unknown*/ = $(tmpCalleeParam);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpBinLhs /*:unknown*/ = b.c;
  const tmpIfTest$1 /*:boolean*/ = tmpBinLhs == null;
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
  if (b.c == null) {
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
  const e = d == null;
  if (e) {
    const f = $( "b" );
    b.c = f;
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
 - 3: 'b'
 - 4: { c: '"b"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
