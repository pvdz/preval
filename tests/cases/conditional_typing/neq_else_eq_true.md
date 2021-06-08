# Preval test case

# neq_else_eq_true.md

> Conditional typing > Neq else eq true
>
> Assignment that cannot be observed should be dropped

#TODO

## Input

`````js filename=intro
const a = $(67636)
let x = a !== 67636;
if (x) {
} else {
  x = a === 67636;
}
$(x)
`````

## Pre Normal

`````js filename=intro
const a = $(67636);
let x = a !== 67636;
if (x) {
} else {
  x = a === 67636;
}
$(x);
`````

## Normalized

`````js filename=intro
const a = $(67636);
let x = a !== 67636;
if (x) {
} else {
  x = a === 67636;
}
$(x);
`````

## Output

`````js filename=intro
const a = $(67636);
let x = a !== 67636;
if (x) {
} else {
  x = true;
}
$(x);
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