# Preval test case

# neq_if_neq_true_bad.md

> Conditional typing > Neq if neq true bad
>
> Assignment that cannot be observed should be dropped

## Input

`````js filename=intro
const a = $(67636)
let x = a !== 67636;
if (x) {
  a = 10;
  x = a !== 67636;
} else {
  $(`Preval: Cannot write to const binding \`a\``);
}
$(x);
`````

## Pre Normal


`````js filename=intro
const a = $(67636);
let x = a !== 67636;
if (x) {
  a = 10;
  x = a !== 67636;
} else {
  $(`Preval: Cannot write to const binding \`a\``);
}
$(x);
`````

## Normalized


`````js filename=intro
const a = $(67636);
let x = a !== 67636;
if (x) {
  a = 10;
  x = a !== 67636;
} else {
  $(`Preval: Cannot write to const binding \`a\``);
}
$(x);
`````

## Output


`````js filename=intro
const a = $(67636);
let x = a !== 67636;
if (x) {
  x = true;
} else {
  $(`Preval: Cannot write to const binding \`a\``);
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 67636 );
let b = a !== 67636;
if (b) {
  b = true;
}
else {
  $( "Preval: Cannot write to const binding `a`" );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 67636
 - 2: 'Preval: Cannot write to const binding `a`'
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
