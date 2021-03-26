# Preval test case

# no__multiple_levels.md

> Binding > Promote const > No  multiple levels
>
> Test block occurrence matching

Can not promote x to a constant.

#TODO

## Input

`````js filename=intro
var x;
if ($(1)) {
  x = 10;
}
if ($(2)) {
  if ($(3)) {
    // Should not confuse this occurrence as being "nested" in the assignment block
    $(x);
  }
}
`````

## Pre Normal

`````js filename=intro
let x = undefined;
if ($(1)) {
  x = 10;
}
if ($(2)) {
  if ($(3)) {
    $(x);
  }
}
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  x = 10;
}
const tmpIfTest$1 = $(2);
if (tmpIfTest$1) {
  const tmpIfTest$3 = $(3);
  if (tmpIfTest$3) {
    $(x);
  }
}
`````

## Output

`````js filename=intro
let x = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  x = 10;
}
const tmpIfTest$1 = $(2);
if (tmpIfTest$1) {
  const tmpIfTest$3 = $(3);
  if (tmpIfTest$3) {
    $(x);
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
