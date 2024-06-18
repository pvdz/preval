# Preval test case

# no__read_on_deeper_level_in_different_branch.md

> Binding > Promote const > No  read on deeper level in different branch
>
> Confirm that we properly deal with a read of a var binding that occurs in a different branch from the assignment.

This proofs that we can't get away with only tracking the lowest depth count + block pid for validation purposes. We need to track the entire block stack for each binding to validate the ancestry.

The x should not be made a constant.

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

## Pre Normal


`````js filename=intro
let x = undefined;
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
let x = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    x = 10;
  } else {
  }
  const tmpIfTest$3 = $(3);
  if (tmpIfTest$3) {
    const tmpIfTest$5 = $(4);
    if (tmpIfTest$5) {
      $(x);
    } else {
    }
  } else {
  }
} else {
}
`````

## Output


`````js filename=intro
let x = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    x = 10;
  } else {
  }
  const tmpIfTest$3 = $(3);
  if (tmpIfTest$3) {
    const tmpIfTest$5 = $(4);
    if (tmpIfTest$5) {
      $(x);
    } else {
    }
  } else {
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
if (b) {
  const c = $( 2 );
  if (c) {
    a = 10;
  }
  const d = $( 3 );
  if (d) {
    const e = $( 4 );
    if (e) {
      $( a );
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
