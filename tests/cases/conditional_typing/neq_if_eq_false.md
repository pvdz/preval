# Preval test case

# neq_if_eq_false.md

> Conditional typing > Neq if eq false
>
> Assignment that cannot be observed should be dropped

There's two aspects here;
- We can know the assigned value is false
- The binding `x` is already false in the else branch so the assignment is redundant

## Input

`````js filename=intro
const a = $(67637)
let x = a !== 67636;
if (x) {
  x = a === 67636;
} else {
}
$(x)
`````

## Pre Normal

`````js filename=intro
const a = $(67637);
let x = a !== 67636;
if (x) {
  x = a === 67636;
} else {
}
$(x);
`````

## Normalized

`````js filename=intro
const a = $(67637);
let x = a !== 67636;
if (x) {
  x = a === 67636;
} else {
}
$(x);
`````

## Output

`````js filename=intro
$(67637);
$(false);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 67637
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
