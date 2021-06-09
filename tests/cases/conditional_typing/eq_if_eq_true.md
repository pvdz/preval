# Preval test case

# eq_if_eq_true.md

> Conditional typing > Eq if eq true
>
> Assignment that cannot be observed should be dropped

First step: assign `false` instead of the repeat expression
Second step: eliminate the assignment since we know `x` is already `false` at that point

#TODO

## Input

`````js filename=intro
const a = $(67636)
let x = a === 67636;
if (x) {
  x = a === 67636;
} else {
}
$(x)
`````

## Pre Normal

`````js filename=intro
const a = $(67636);
let x = a === 67636;
if (x) {
  x = a === 67636;
} else {
}
$(x);
`````

## Normalized

`````js filename=intro
const a = $(67636);
let x = a === 67636;
if (x) {
  x = a === 67636;
} else {
}
$(x);
`````

## Output

`````js filename=intro
const a = $(67636);
let x = a === 67636;
if (x) {
  x = a === 67636;
} else {
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
