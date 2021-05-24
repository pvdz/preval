# Preval test case

# if_if_ssa_cons_neither_read.md

> Last write analysis > If if ssa cons neither read
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

#TODO

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

## Pre Normal

`````js filename=intro
let x = $('a');
$(x);
x = $('b');
if ($(1)) {
  x = $('c');
  if ($(2)) {
    $('123');
  }
  $(x);
}
`````

## Normalized

`````js filename=intro
let x = $('a');
$(x);
x = $('b');
const tmpIfTest = $(1);
if (tmpIfTest) {
  x = $('c');
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    $('123');
  } else {
  }
  $(x);
} else {
}
`````

## Output

`````js filename=intro
const x = $('a');
$(x);
$('b');
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpClusterSSA_x = $('c');
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    $('123');
  } else {
  }
  $(tmpClusterSSA_x);
} else {
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
 - 5: 'c'
 - 6: 2
 - 7: '123'
 - 8: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
