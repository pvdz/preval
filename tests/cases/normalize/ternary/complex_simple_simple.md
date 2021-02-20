# Preval test case

# complex_simple_simple.md

> Normalize > Ternary > Complex simple simple
>
> Ternary (conditional expressions) should have their args be normalized. But they shouldn't be pulled out, obviously.

#TODO

## Input

`````js filename=intro
const a = $(1) ? 2 : 3
const b = $(0) ? 4 : 5
$(a, b)
`````

## Normalized

`````js filename=intro
let a = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 2;
} else {
  a = 3;
}
let b = undefined;
const tmpIfTest$1 = $(0);
if (tmpIfTest$1) {
  b = 4;
} else {
  b = 5;
}
$(a, b);
`````

## Output

`````js filename=intro
let a = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  a = 2;
} else {
  a = 3;
}
let b = undefined;
const tmpIfTest$1 = $(0);
if (tmpIfTest$1) {
  b = 4;
} else {
  b = 5;
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 2, 5
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
