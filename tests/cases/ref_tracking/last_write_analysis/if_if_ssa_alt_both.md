# Preval test case

# if_if_ssa_alt_both.md

> Ref tracking > Last write analysis > If if ssa alt both
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

## Input

`````js filename=intro
let x = $('a');
$(x);
// Do not SSA because at least one branch writes to x but not all branches do.
x = $('b');
if ($(1)) {
} else {
  x = $('c');
  if ($(2)) {
    x = $('d');
  } else {
    x = $('e');
  }
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
  $(tmpClusterSSA_x);
} else {
  $(`c`);
  const tmpIfTest$1 /*:unknown*/ = $(2);
  if (tmpIfTest$1) {
    const tmpClusterSSA_x$1 /*:unknown*/ = $(`d`);
    $(tmpClusterSSA_x$1);
  } else {
    const tmpClusterSSA_x$3 /*:unknown*/ = $(`e`);
    $(tmpClusterSSA_x$3);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`a`));
const tmpClusterSSA_x = $(`b`);
if ($(1)) {
  $(tmpClusterSSA_x);
} else {
  $(`c`);
  if ($(2)) {
    $($(`d`));
  } else {
    $($(`e`));
  }
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
  $( b );
}
else {
  $( "c" );
  const d = $( 2 );
  if (d) {
    const e = $( "d" );
    $( e );
  }
  else {
    const f = $( "e" );
    $( f );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'b'
 - 4: 1
 - 5: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
