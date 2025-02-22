# Preval test case

# back-to-back-if-test.md

> If weaving > Back-to-back-if-test
>
> In this case $(c) is unreachable because $(d) is invariably visited.

## Input

`````js filename=intro
x = !tmpUnaryArg;
if (x) {
  $(`a`);
} else {
  $(`b`);
  x = true;
}
if (x) {
  $(`d`);
} else {
  $(`c`);
}
`````

## Pre Normal


`````js filename=intro
x = !tmpUnaryArg;
if (x) {
  $(`a`);
} else {
  $(`b`);
  x = true;
}
if (x) {
  $(`d`);
} else {
  $(`c`);
}
`````

## Normalized


`````js filename=intro
x = !tmpUnaryArg;
if (x) {
  $(`a`);
} else {
  $(`b`);
  x = true;
}
if (x) {
  $(`d`);
} else {
  $(`c`);
}
`````

## Output


`````js filename=intro
x = !tmpUnaryArg;
const tmpBool /*:boolean*/ = !tmpUnaryArg;
x = tmpBool;
if (tmpUnaryArg) {
  $(`b`);
  x = true;
} else {
  $(`a`);
}
if (x) {
  $(`d`);
} else {
  $(`c`);
}
`````

## PST Output

With rename=true

`````js filename=intro
x = !tmpUnaryArg;
const a = !tmpUnaryArg;
x = a;
if (tmpUnaryArg) {
  $( "b" );
  x = true;
}
else {
  $( "a" );
}
if (x) {
  $( "d" );
}
else {
  $( "c" );
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

tmpUnaryArg, x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
