# Preval test case

# base_boolean_false.md

> If bool > Base boolean false
>
> When the if-test is the arg to Boolean or bang then the value can be predicted

## Input

`````js filename=intro
const x = $(1);
if (x) {
} else {
  $(Boolean(x)); // $(true)!
}
`````

## Pre Normal


`````js filename=intro
const x = $(1);
if (x) {
} else {
  $(Boolean(x));
}
`````

## Normalized


`````js filename=intro
const x = $(1);
if (x) {
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = Boolean(x);
  tmpCallCallee(tmpCalleeParam);
}
`````

## Output


`````js filename=intro
const x = $(1);
if (x) {
} else {
  $(false);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {

}
else {
  $( false );
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
