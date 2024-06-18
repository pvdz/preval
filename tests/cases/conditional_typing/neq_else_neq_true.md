# Preval test case

# neq_else_neq_true.md

> Conditional typing > Neq else neq true
>
> Assignment that cannot be observed should be dropped

## Input

`````js filename=intro
const a = $(67636)
let x = a !== 67636;
if (x) {
} else {
  x = a !== 67636;
}
$(x)
`````

## Pre Normal


`````js filename=intro
const a = $(67636);
let x = a !== 67636;
if (x) {
} else {
  x = a !== 67636;
}
$(x);
`````

## Normalized


`````js filename=intro
const a = $(67636);
let x = a !== 67636;
if (x) {
} else {
  x = a !== 67636;
}
$(x);
`````

## Output


`````js filename=intro
const a = $(67636);
const x = a === 67636;
if (x) {
  $(false);
} else {
  $(true);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 67636 );
const b = a === 67636;
if (b) {
  $( false );
}
else {
  $( true );
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
