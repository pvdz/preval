# Preval test case

# stmt_logical_or_eq_null.md

> Logical > Compound > Ident > Stmt > Stmt logical or eq null
>
>

## Input

`````js filename=intro
let b = $(null);
if ($(true)) b ||= $('b');
$(b);
`````


## Settled


`````js filename=intro
const b /*:unknown*/ = $(null);
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
const b = $(null);
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
const a = $( null );
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = $(null);
const tmpIfTest = $(true);
if (tmpIfTest) {
  if (b) {
    $(b);
  } else {
    b = $(`b`);
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
 - 1: null
 - 2: true
 - 3: 'b'
 - 4: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
