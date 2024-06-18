# Preval test case

# string.md

> Normalize > Spread > Falsy > String
>
> Spreading a falsy is an error unless it's a string, in that case it's a noop

## Input

`````js filename=intro
const x = $("hello");
if (x) {
  $('truthy', ...x);
} else {
  $('falsy', ...x);
}
`````

## Pre Normal


`````js filename=intro
const x = $(`hello`);
if (x) {
  $(`truthy`, ...x);
} else {
  $(`falsy`, ...x);
}
`````

## Normalized


`````js filename=intro
const x = $(`hello`);
if (x) {
  $(`truthy`, ...x);
} else {
  $(`falsy`, ...x);
}
`````

## Output


`````js filename=intro
const x = $(`hello`);
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
const a = $( "hello" );
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
 - 1: 'hello'
 - 2: 'truthy', 'h', 'e', 'l', 'l', 'o'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
