# Preval test case

# if_if_ssa_alt_neither.md

> Last write analysis > If if ssa alt neither
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
const x = $(`a`);
$(x);
let tmpClusterSSA_x = $(`b`);
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    $(`xyz`);
  } else {
  }
} else {
  tmpClusterSSA_x = $(`c`);
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
