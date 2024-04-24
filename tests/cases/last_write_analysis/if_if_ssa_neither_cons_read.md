# Preval test case

# if_if_ssa_neither_cons_read.md

> Last write analysis > If if ssa neither cons read
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

#TODO

## Input

`````js filename=intro
let x = $('a');
$(x);
// Do not SSA
x = $('b');
if ($(1)) {
  if ($(2)) {
    x = $('c');
  }
  // Can observe b and c
  $(x);
}
`````

## Pre Normal

`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
if ($(1)) {
  if ($(2)) {
    x = $(`c`);
  }
  $(x);
}
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
    x = $(`c`);
  } else {
  }
  $(x);
} else {
}
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
    x = $(`c`);
    $(x);
  } else {
    $(x);
  }
} else {
}
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
    a = $( "c" );
    $( a );
  }
  else {
    $( a );
  }
}
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
 - 6: 'c'
 - 7: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
