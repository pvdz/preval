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

## Pre Normal

`````js filename=intro
let x = undefined;
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
let x = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  x = 10;
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    const tmpIfTest$3 = $(3);
    if (tmpIfTest$3) {
      $(x);
    } else {
    }
  } else {
  }
  $(x);
} else {
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    const tmpIfTest$3 = $(3);
    if (tmpIfTest$3) {
      $(10);
    } else {
    }
  } else {
  }
  $(10);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 2 );
  if (b) {
    const c = $( 3 );
    if (c) {
      $( 10 );
    }
  }
  $( 10 );
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
