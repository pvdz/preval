# Preval test case

# let_constants.md

> Tofix > Let constants
>
> Not sure but currently this is not minified further while it obviously could be

#TODO

## Input

`````js filename=intro
let a = "fail";
if ($) {
  a = "pass";
  $( "pass" );
} else {
  const b = a;
  $( b );
  $( b );
}
`````

## Pre Normal

`````js filename=intro
let a = `fail`;
if ($) {
  a = `pass`;
  $(`pass`);
} else {
  const b = a;
  $(b);
  $(b);
}
`````

## Normalized

`````js filename=intro
let a = `fail`;
if ($) {
  a = `pass`;
  $(`pass`);
} else {
  const b = a;
  $(b);
  $(b);
}
`````

## Output

`````js filename=intro
let a = `fail`;
if ($) {
  a = `pass`;
  $(`pass`);
} else {
  const b = a;
  $(b);
  $(b);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = "fail";
if ($) {
  a = "pass";
  $( "pass" );
}
else {
  const b = a;
  $( b );
  $( b );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
