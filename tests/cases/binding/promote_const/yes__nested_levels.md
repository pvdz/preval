# Preval test case

# yes__nested_levels.md

> Binding > Promote const > Yes  nested levels
>
> Test block occurrence matching

All reads of x appear on the same level or nested from the only write (beyond the decl) and in the same scope.

This means x be safely made into a constant.

#TODO

## Input

`````js filename=intro
var x;
if ($(1)) {
  x = 10;
  if ($(2)) {
    if ($(3)) {
      $(x);
    }
  }
  $(x);
}
`````

## Normalized

`````js filename=intro
var x;
const tmpIfTest = $(1);
if (tmpIfTest) {
  x = 10;
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    const tmpIfTest$2 = $(3);
    if (tmpIfTest$2) {
      $(x);
    }
  }
  $(x);
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    const tmpIfTest$2 = $(3);
    if (tmpIfTest$2) {
      $(10);
    }
  }
  $(10);
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
 - 5: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
