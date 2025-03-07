# Preval test case

# if_if_ssa_cons_cons.md

> Ref tracking > Last write analysis > If if ssa cons cons
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
    x = $('d');
  }
}
$(x);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(`a`);
$(x);
let tmpClusterSSA_x /*:unknown*/ = $(`b`);
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  tmpClusterSSA_x = $(`c`);
  const tmpIfTest$1 /*:unknown*/ = $(2);
  if (tmpIfTest$1) {
    tmpClusterSSA_x = $(`d`);
  } else {
  }
} else {
}
$(tmpClusterSSA_x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`a`));
let tmpClusterSSA_x = $(`b`);
if ($(1)) {
  tmpClusterSSA_x = $(`c`);
  if ($(2)) {
    tmpClusterSSA_x = $(`d`);
  }
}
$(tmpClusterSSA_x);
`````

## Pre Normal


`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
if ($(1)) {
  x = $(`c`);
  if ($(2)) {
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
    x = $(`d`);
  } else {
  }
} else {
}
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
$( a );
let b = $( "b" );
const c = $( 1 );
if (c) {
  b = $( "c" );
  const d = $( 2 );
  if (d) {
    b = $( "d" );
  }
}
$( b );
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
 - 7: 'd'
 - 8: 'd'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
