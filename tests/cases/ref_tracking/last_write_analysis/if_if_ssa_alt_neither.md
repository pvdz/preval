# Preval test case

# if_if_ssa_alt_neither.md

> Ref tracking > Last write analysis > If if ssa alt neither
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
  if ($(2)) {
    $('xyz');
  }
} else {
  x = $('c');
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
if ($(1)) {
  if ($(2)) {
    $(`xyz`);
  }
} else {
  x = $(`c`);
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
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    $(`xyz`);
  } else {
  }
} else {
  x = $(`c`);
}
$(x);
`````

## Output

`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    $(`xyz`);
  } else {
  }
} else {
  x = $(`c`);
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( "a" );
$( a );
a = $( "b" );
const b = $( 1 );
if (b) {
  const c = $( 2 );
  if (c) {
    $( "xyz" );
  }
}
else {
  a = $( "c" );
}
$( a );
`````

## Globals

None

## Result

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

Final output calls: Same