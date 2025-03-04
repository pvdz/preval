# Preval test case

# if_if_ssa_alt_alt.md

> Ref tracking > Last write analysis > If if ssa alt alt
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
  } else {
    x = $('d');
  }
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
if ($(1)) {
} else {
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
} else {
  x = $(`c`);
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
  } else {
    x = $(`d`);
  }
}
$(x);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(`a`);
$(x);
let tmpClusterSSA_x /*:unknown*/ = $(`b`);
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
} else {
  tmpClusterSSA_x = $(`c`);
  const tmpIfTest$1 /*:unknown*/ = $(2);
  if (tmpIfTest$1) {
  } else {
    tmpClusterSSA_x = $(`d`);
  }
}
$(tmpClusterSSA_x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "a" );
$( a );
let b = $( "b" );
const c = $( 1 );
if (c) {

}
else {
  b = $( "c" );
  const d = $( 2 );
  if (d) {

  }
  else {
    b = $( "d" );
  }
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'b'
 - 4: 1
 - 5: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
