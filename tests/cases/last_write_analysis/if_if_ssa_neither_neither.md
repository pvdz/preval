# Preval test case

# if_if_ssa_neither_neither.md

> Last write analysis > If if ssa neither neither
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

#TODO

## Input

`````js filename=intro
let x = $('a');
$(x);
// This write should be SSA'd because the `if` has no write
x = $('b');
if ($(1)) {
  if ($(2)) {
    $('xyz');
  }
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = $('a');
$(x);
x = $('b');
if ($(1)) {
  if ($(2)) {
    $('xyz');
  }
}
$(x);
`````

## Normalized

`````js filename=intro
let x = $('a');
$(x);
x = $('b');
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    $('xyz');
  } else {
  }
} else {
}
$(x);
`````

## Output

`````js filename=intro
const x = $('a');
$(x);
const tmpClusterSSA_x = $('b');
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    $('xyz');
  } else {
  }
} else {
}
$(tmpClusterSSA_x);
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
