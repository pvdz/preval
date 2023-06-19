# Preval test case

# nan.md

> Normalize > Spread > Falsy > Nan
>
> Spreading a falsy is an error unless it's a string, in that case it's a noop

#TODO

## Input

`````js filename=intro
const x = $(NaN);
if (x) {
  $('truthy', ...x);
} else {
  $('falsy', ...x);
}
`````

## Pre Normal

`````js filename=intro
const x = $(NaN);
if (x) {
  $(`truthy`, ...x);
} else {
  $(`falsy`, ...x);
}
`````

## Normalized

`````js filename=intro
const x = $(NaN);
if (x) {
  $(`truthy`, ...x);
} else {
  $(`falsy`, ...x);
}
`````

## Output

`````js filename=intro
const x = $(NaN);
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

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same