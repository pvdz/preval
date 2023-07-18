# Preval test case

# undefined.md

> Normalize > Spread > Falsy > Undefined
>
> Spreading a falsy is an error unless it's a string, in that case it's a noop

#TODO

## Input

`````js filename=intro
const x = $(undefined);
if (x) {
  $('truthy', ...x);
} else {
  $('falsy', ...x);
}
`````

## Pre Normal

`````js filename=intro
const x = $(undefined);
if (x) {
  $(`truthy`, ...x);
} else {
  $(`falsy`, ...x);
}
`````

## Normalized

`````js filename=intro
const x = $(undefined);
if (x) {
  $(`truthy`, ...x);
} else {
  $(`falsy`, ...x);
}
`````

## Output

`````js filename=intro
const x = $(undefined);
if (x) {
  $(`truthy`, ...x);
} else {
  const tmpIfTest = x === ``;
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
const a = $( undefined );
if (a) {
  $( "truthy", ... a );
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
 - 1: undefined
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: BAD!!
 - 1: undefined
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')
