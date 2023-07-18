# Preval test case

# if_if_ssa_cons_neither.md

> Last write analysis > If if ssa cons neither
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

#TODO

## Input

`````js filename=intro
let x = $('a');
$(x);
// Do not SSA because at least one branch writes to x but not all branches do.
x = $('b');
if ($(1)) {
  x = $('c');
  if ($(2)) {
    $('xyz');
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
  x = $(`c`);
  if ($(2)) {
    $(`xyz`);
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
    $(`xyz`);
  } else {
  }
} else {
}
$(x);
`````

## Output

`````js filename=intro
const x = $(`a`);
$(x);
let tmpClusterSSA_x = $(`b`);
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpClusterSSA_x = $(`c`);
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    $(`xyz`);
  } else {
  }
} else {
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
  b = $( "c" );
  const d = $( 2 );
  if (d) {
    $( "xyz" );
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
 - 5: 'c'
 - 6: 2
 - 7: 'xyz'
 - 8: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
