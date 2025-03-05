# Preval test case

# base_boolean_true.md

> If bool > Base boolean true
>
> When the if-test is the arg to Boolean or bang then the value can be predicted

## Input

`````js filename=intro
const x = $(1);
if (x) {
  $(Boolean(x)); // $(true)!
}
`````

## Pre Normal


`````js filename=intro
const x = $(1);
if (x) {
  $(Boolean(x));
}
`````

## Normalized


`````js filename=intro
const x = $(1);
if (x) {
  const tmpCalleeParam = Boolean(x);
  $(tmpCalleeParam);
} else {
}
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(1);
if (x) {
  $(true);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( true );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
