# Preval test case

# var_complex_complex.md

> Logical > Or > Var complex complex
>
> Logical ops need to be normalized

## Input

`````js filename=intro
const x = $(1) || $(2);
`````

## Pre Normal


`````js filename=intro
const x = $(1) || $(2);
`````

## Normalized


`````js filename=intro
let x = $(1);
if (x) {
} else {
  x = $(2);
}
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(1);
if (x) {
} else {
  $(2);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {

}
else {
  $( 2 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
