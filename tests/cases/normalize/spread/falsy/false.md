# Preval test case

# false.md

> Normalize > Spread > Falsy > False
>
> Spreading a falsy is an error unless it's a string, in that case it's a noop

## Input

`````js filename=intro
const x = $(false);
if (x) {
  $('truthy', ...x);
} else {
  $('falsy', ...x);
}
`````

## Pre Normal


`````js filename=intro
const x = $(false);
if (x) {
  $(`truthy`, ...x);
} else {
  $(`falsy`, ...x);
}
`````

## Normalized


`````js filename=intro
const x = $(false);
if (x) {
  $(`truthy`, ...x);
} else {
  $(`falsy`, ...x);
}
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(false);
if (x) {
  $(`truthy`, ...x);
} else {
  const tmpIfTest /*:boolean*/ = x === ``;
  if (tmpIfTest) {
    $(`falsy`);
  } else {
    throw `Preval: Attempting to spread primitive that is not an empty string`;
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  $( "truthy", ...a );
}
else {
  const b = a === "";
  if (b) {
    $( "falsy" );
  }
  else {
    throw "Preval: Attempting to spread primitive that is not an empty string";
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
