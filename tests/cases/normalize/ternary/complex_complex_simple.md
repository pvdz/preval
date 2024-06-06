# Preval test case

# complex_complex_simple.md

> Normalize > Ternary > Complex complex simple
>
> Ternary (conditional expressions) should have their args be normalized. But they shouldn't be pulled out, obviously.

#TODO

## Input

`````js filename=intro
const a = $(1) ? $(2) : 3
const b = $(0) ? $(4) : 5
$(a, b)
`````

## Pre Normal


`````js filename=intro
const a = $(1) ? $(2) : 3;
const b = $(0) ? $(4) : 5;
$(a, b);
`````

## Normalized


`````js filename=intro
let a = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = $(2);
} else {
  a = 3;
}
let b = undefined;
const tmpIfTest$1 = $(0);
if (tmpIfTest$1) {
  b = $(4);
} else {
  b = 5;
}
$(a, b);
`````

## Output


`````js filename=intro
let a = 3;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = $(2);
} else {
}
const tmpIfTest$1 = $(0);
if (tmpIfTest$1) {
  const tmpClusterSSA_b = $(4);
  $(a, tmpClusterSSA_b);
} else {
  $(a, 5);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = 3;
const b = $( 1 );
if (b) {
  a = $( 2 );
}
const c = $( 0 );
if (c) {
  const d = $( 4 );
  $( a, d );
}
else {
  $( a, 5 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 0
 - 4: 2, 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
