# Preval test case

# if_if_ssa_cons_neither_read.md

> Ref tracking > Last write analysis > If if ssa cons neither read
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

## Input

`````js filename=intro
let x = $('a');
$(x);
// This write should be dropped
x = $('b');
if ($(1)) {
  // This write should be SSA'd
  x = $('c');
  if ($(2)) {
    $('123');
  }
  // Can only observe c
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
  const tmpClusterSSA_x /*:unknown*/ = $(`c`);
  const tmpIfTest$1 /*:unknown*/ = $(2);
  if (tmpIfTest$1) {
    $(`123`);
    $(tmpClusterSSA_x);
  } else {
    $(tmpClusterSSA_x);
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`a`));
$(`b`);
if ($(1)) {
  const tmpClusterSSA_x = $(`c`);
  if ($(2)) {
    $(`123`);
    $(tmpClusterSSA_x);
  } else {
    $(tmpClusterSSA_x);
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
  const c = $( "c" );
  const d = $( 2 );
  if (d) {
    $( "123" );
    $( c );
  }
  else {
    $( c );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
const tmpIfTest = $(1);
if (tmpIfTest) {
  x = $(`c`);
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    $(`123`);
    $(x);
  } else {
    $(x);
  }
} else {
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
 - 5: 'c'
 - 6: 2
 - 7: '123'
 - 8: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
