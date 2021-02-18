# Preval test case

# read_on_deeper_level_in_different_branch.md

> binding > read_on_deeper_level_in_different_branch
>
> Confirm that we properly deal with a read of a var binding that occurs in a different branch from the assignment.

This proofs that we can't get away with only tracking the lowest depth count + block pid for validation purposes. We need to track the entire block stack for each binding to validate the ancestry.

The x should not be made a constant.

#TODO

## Input

`````js filename=intro
var x;
if ($(1)) {
  if ($(2)) {
    x = 10;
  }
  if ($(3)) {
    if ($(4)) {
      $(x);
    }
  }
}
`````

## Normalized

`````js filename=intro
var x;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    x = 10;
  }
  const tmpIfTest$2 = $(3);
  if (tmpIfTest$2) {
    const tmpIfTest$3 = $(4);
    if (tmpIfTest$3) {
      $(x);
    }
  }
}
`````

## Output

`````js filename=intro
var x;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    x = 10;
  }
  const tmpIfTest$2 = $(3);
  if (tmpIfTest$2) {
    const tmpIfTest$3 = $(4);
    if (tmpIfTest$3) {
      $(x);
    }
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
 - 4: 4
 - 5: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same