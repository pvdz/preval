# Preval test case

# another5.md

> Function self assign closure alias > Another5

## Input

`````js filename=intro
let zzzz = function () {
  debugger;
  a = [1, 2, 3];
  return a;
};
let a = undefined;
const x = zzzz;
zzzz();
zzzz();
x();
x();
x();
zzzz();
`````

## Pre Normal


`````js filename=intro
let zzzz = function () {
  debugger;
  a = [1, 2, 3];
  return a;
};
let a = undefined;
const x = zzzz;
zzzz();
zzzz();
x();
x();
x();
zzzz();
`````

## Normalized


`````js filename=intro
let zzzz = function () {
  debugger;
  a = [1, 2, 3];
  return a;
};
let a = undefined;
const x = zzzz;
zzzz();
zzzz();
x();
x();
x();
zzzz();
`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
