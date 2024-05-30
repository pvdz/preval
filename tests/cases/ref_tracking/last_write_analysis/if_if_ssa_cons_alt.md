# Preval test case

# if_if_ssa_cons_alt.md

> Ref tracking > Last write analysis > If if ssa cons alt
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
  } else {
    x = $(`d`);
  }
} else {
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
  x = $(`c`);
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
  } else {
    x = $(`d`);
  }
} else {
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
  a = $( "c" );
  const c = $( 2 );
  if (c) {

  }
  else {
    a = $( "d" );
  }
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
 - 5: 'c'
 - 6: 2
 - 7: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
