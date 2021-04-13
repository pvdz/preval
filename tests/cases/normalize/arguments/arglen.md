# Preval test case

# arglen.md

> Normalize > Arguments > Arglen
>
> This was causing a problem when arguments was passed on in a call.

#TODO

## Input

`````js filename=intro
function f() {
  f.apply(this, arguments.length);
}
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const tmpthis = this;
  const tmpArgumentsLen = arguments.length;
  debugger;
  f.apply(tmpthis, tmpArgumentsLen);
};
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpthis = this;
  const tmpArgumentsLen = arguments.length;
  debugger;
  f.apply(tmpthis, tmpArgumentsLen);
  return undefined;
};
`````

## Output

`````js filename=intro
const f = function () {
  const tmpthis = this;
  const tmpArgumentsLen = arguments.length;
  debugger;
  f.apply(tmpthis, tmpArgumentsLen);
  return undefined;
};
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
