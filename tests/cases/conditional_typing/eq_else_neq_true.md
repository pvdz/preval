# Preval test case

# eq_else_neq_true.md

> Conditional typing > Eq else neq true
>
> Assignment that cannot be observed should be dropped

#TODO

## Input

`````js filename=intro
const a = $(67636)
let x = a === 67636;
if (x) {
} else {
  x = a !== 67636;
}
$(x)
`````

## Pre Normal

`````js filename=intro
const a = $(67636);
let x = a === 67636;
if (x) {
} else {
  x = a !== 67636;
}
$(x);
`````

## Normalized

`````js filename=intro
const a = $(67636);
let x = a === 67636;
if (x) {
} else {
  x = a !== 67636;
}
$(x);
`````

## Output

`````js filename=intro
$(67636);
$(true);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 67636
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
