# Preval test case

# complex_simple_complex.md

> Normalize > Ternary > Complex simple complex
>
> Ternary (conditional expressions) should have their args be normalized. But they shouldn't be pulled out, obviously.

#TODO

## Input

`````js filename=intro
const a = $(1) ? 2 : $(3)
const b = $(0) ? 4 : $(5)
$(a, b)
`````

## Pre Normal

`````js filename=intro
const a = $(1) ? 2 : $(3);
const b = $(0) ? 4 : $(5);
$(a, b);
`````

## Normalized

`````js filename=intro
let a = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 2;
} else {
  a = $(3);
}
let b = undefined;
const tmpIfTest$1 = $(0);
if (tmpIfTest$1) {
  b = 4;
} else {
  b = $(5);
}
$(a, b);
`````

## Output

`````js filename=intro
let a = 2;
const tmpIfTest = $(1);
if (tmpIfTest) {
} else {
  a = $(3);
}
const tmpIfTest$1 = $(0);
if (tmpIfTest$1) {
  $(a, 4);
} else {
  const tmpClusterSSA_b = $(5);
  $(a, tmpClusterSSA_b);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = 2;
const b = $( 1 );
if (b) {

}
else {
  a = $( 3 );
}
const c = $( 0 );
if (c) {
  $( a, 4 );
}
else {
  const d = $( 5 );
  $( a, d );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 5
 - 4: 2, 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
