# Preval test case

# if_if_ssa_alt_alt_read.md

> Ref tracking > Last write analysis > If if ssa alt alt read
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

## Input

`````js filename=intro
let x = $('a');
$(x);
// This write should be dropped since it cannot be observed
x = $('b');
if ($(1)) {
} else {
  x = $('c');
  if ($(2)) {
  } else {
    x = $('d');
  }
  // Can only observe c and d
  $(x);
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`a`);
$(x);
$(`b`);
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
} else {
  const tmpClusterSSA_x /*:unknown*/ = $(`c`);
  const tmpIfTest$1 /*:unknown*/ = $(2);
  if (tmpIfTest$1) {
    $(tmpClusterSSA_x);
  } else {
    const tmpClusterSSA_x$1 /*:unknown*/ = $(`d`);
    $(tmpClusterSSA_x$1);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`a`));
$(`b`);
if (!$(1)) {
  const tmpClusterSSA_x = $(`c`);
  if ($(2)) {
    $(tmpClusterSSA_x);
  } else {
    $($(`d`));
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
$( a );
$( "b" );
const b = $( 1 );
if (b) {

}
else {
  const c = $( "c" );
  const d = $( 2 );
  if (d) {
    $( c );
  }
  else {
    const e = $( "d" );
    $( e );
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
