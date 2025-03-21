# Preval test case

# if_if_ssa_alt_neither.md

> Ref tracking > Last write analysis > If if ssa alt neither
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

## Input

`````js filename=intro
let x = $('a');
$(x);
// Do not SSA because at least one branch writes to x but not all branches do.
x = $('b');
if ($(1)) {
  if ($(2)) {
    $('xyz');
  }
} else {
  x = $('c');
}
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`a`);
$(x);
const tmpClusterSSA_x /*:unknown*/ = $(`b`);
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(2);
  if (tmpIfTest$1) {
    $(`xyz`);
    $(tmpClusterSSA_x);
  } else {
    $(tmpClusterSSA_x);
  }
} else {
  const tmpClusterSSA_x$1 /*:unknown*/ = $(`c`);
  $(tmpClusterSSA_x$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`a`));
const tmpClusterSSA_x = $(`b`);
if ($(1)) {
  if ($(2)) {
    $(`xyz`);
    $(tmpClusterSSA_x);
  } else {
    $(tmpClusterSSA_x);
  }
} else {
  $($(`c`));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
$( a );
const b = $( "b" );
const c = $( 1 );
if (c) {
  const d = $( 2 );
  if (d) {
    $( "xyz" );
    $( b );
  }
  else {
    $( b );
  }
}
else {
  const e = $( "c" );
  $( e );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'b'
 - 4: 1
 - 5: 2
 - 6: 'xyz'
 - 7: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
