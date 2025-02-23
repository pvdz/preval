# Preval test case

# base_bool_unknown_true.md

> Type tracked > If > Base bool unknown true
>
> Even if we don't know about the concrete value of a binding, sometimes the type is sufficient for optimization

## Input

`````js filename=intro
const a = $(false);
const x = a === false;
if (x) {
  $(x, 'false');
} else {
  $(x, 'pass');
}
`````

## Pre Normal


`````js filename=intro
const a = $(false);
const x = a === false;
if (x) {
  $(x, `false`);
} else {
  $(x, `pass`);
}
`````

## Normalized


`````js filename=intro
const a = $(false);
const x = a === false;
if (x) {
  $(x, `false`);
} else {
  $(x, `pass`);
}
`````

## Output


`````js filename=intro
const a /*:unknown*/ = $(false);
const x /*:boolean*/ = a === false;
if (x) {
  $(true, `false`);
} else {
  $(false, `pass`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( false );
const b = a === false;
if (b) {
  $( true, "false" );
}
else {
  $( false, "pass" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: true, 'false'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
