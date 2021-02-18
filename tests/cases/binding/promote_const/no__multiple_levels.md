# Preval test case

# multiple_levels.md

> binding > multiple_levels
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

## Normalized

`````js filename=intro
var x;
const tmpIfTest = $(1);
if (tmpIfTest) {
  x = 10;
}
const tmpIfTest$1 = $(2);
if (tmpIfTest$1) {
  const tmpIfTest$2 = $(3);
  if (tmpIfTest$2) {
    $(x);
  }
}
`````

## Output

`````js filename=intro
var x;
const tmpIfTest = $(1);
if (tmpIfTest) {
  x = 10;
}
const tmpIfTest$1 = $(2);
if (tmpIfTest$1) {
  const tmpIfTest$2 = $(3);
  if (tmpIfTest$2) {
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

Normalized calls: Same

Final output calls: Same