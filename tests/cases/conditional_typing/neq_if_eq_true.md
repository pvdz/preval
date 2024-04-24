# Preval test case

# neq_if_eq_true.md

> Conditional typing > Neq if eq true
>
> Assignment that cannot be observed should be dropped

#TODO

## Input

`````js filename=intro
const a = $(67636)
let x = a !== 67636;
if (x) {
  x = a === 67636;
} else {
}
$(x)
`````

## Pre Normal

`````js filename=intro
const a = $(67636);
let x = a !== 67636;
if (x) {
  x = a === 67636;
} else {
}
$(x);
`````

## Normalized

`````js filename=intro
const a = $(67636);
let x = a !== 67636;
if (x) {
  x = a === 67636;
} else {
}
$(x);
`````

## Output

`````js filename=intro
const a = $(67636);
let x = a !== 67636;
if (x) {
  x = a === 67636;
  $(x);
} else {
  $(x);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 67636 );
let b = a !== 67636;
if (b) {
  b = a === 67636;
  $( b );
}
else {
  $( b );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 67636
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
