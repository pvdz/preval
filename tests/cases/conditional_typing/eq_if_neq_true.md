# Preval test case

# eq_if_neq_true.md

> Conditional typing > Eq if neq true
>
> Assignment that cannot be observed should be dropped

## Input

`````js filename=intro
const a = $(67636)
let x = a === 67636;
if (x) {
  x = a !== 67636;
} else {
}
$(x)
`````

## Pre Normal


`````js filename=intro
const a = $(67636);
let x = a === 67636;
if (x) {
  x = a !== 67636;
} else {
}
$(x);
`````

## Normalized


`````js filename=intro
const a = $(67636);
let x = a === 67636;
if (x) {
  x = a !== 67636;
} else {
}
$(x);
`````

## Output


`````js filename=intro
$(67636);
$(false);
`````

## PST Output

With rename=true

`````js filename=intro
$( 67636 );
$( false );
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
