# Preval test case

# eq_else_eq_false.md

> Conditional typing > Eq else eq false
>
> Assignment that cannot be observed should be dropped

There's two aspects here;
- We can know the assigned value is false
- The binding `x` is already false in the else branch so the assignment is redundant

## Input

`````js filename=intro
const a = $(67637)
let x = a === 67636;
if (x) {
} else {
  x = a === 67636;
}
$(x)
`````

## Pre Normal


`````js filename=intro
const a = $(67637);
let x = a === 67636;
if (x) {
} else {
  x = a === 67636;
}
$(x);
`````

## Normalized


`````js filename=intro
const a = $(67637);
let x = a === 67636;
if (x) {
} else {
  x = a === 67636;
}
$(x);
`````

## Output


`````js filename=intro
const a = $(67637);
const x = a === 67636;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 67637 );
const b = a === 67636;
$( b );
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
