# Preval test case

# if_if_ssa_cons_alt.md

> Ref tracking > Last write analysis > If if ssa cons alt
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

## Input

`````js filename=intro
let x = $('a');
$(x);
// Do not SSA because at least one branch writes to x but not all branches do.
x = $('b');
if ($(1)) {
  x = $('c');
  if ($(2)) {
  } else {
    x = $('d');
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
  const tmpClusterSSA_x$1 /*:unknown*/ = $(`c`);
  const tmpIfTest$1 /*:unknown*/ = $(2);
  if (tmpIfTest$1) {
    $(tmpClusterSSA_x$1);
  } else {
    const tmpClusterSSA_x$3 /*:unknown*/ = $(`d`);
    $(tmpClusterSSA_x$3);
  }
} else {
  $(tmpClusterSSA_x);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`a`));
const tmpClusterSSA_x = $(`b`);
if ($(1)) {
  const tmpClusterSSA_x$1 = $(`c`);
  if ($(2)) {
    $(tmpClusterSSA_x$1);
  } else {
    $($(`d`));
  }
} else {
  $(tmpClusterSSA_x);
}
`````

## Pre Normal


`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
if ($(1)) {
  x = $(`c`);
  if ($(2)) {
  } else {
    x = $(`d`);
  }
}
$(x);
`````

## Normalized


`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
const tmpIfTest = $(1);
if (tmpIfTest) {
  x = $(`c`);
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    $(x);
  } else {
    x = $(`d`);
    $(x);
  }
} else {
  $(x);
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
  const d = $( "c" );
  const e = $( 2 );
  if (e) {
    $( d );
  }
  else {
    const f = $( "d" );
    $( f );
  }
}
else {
  $( b );
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
 - 5: 'c'
 - 6: 2
 - 7: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
