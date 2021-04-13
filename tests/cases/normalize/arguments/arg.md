# Preval test case

# arg.md

> Normalize > Arguments > Arg
>
> This was causing a problem when arguments was passed on in a call.

#TODO

## Input

`````js filename=intro
function f() {
  f.apply(this, arguments);
}
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const tmpthis = this;
  const tmpArgumentsAny = arguments;
  debugger;
  f.apply(tmpthis, tmpArgumentsAny);
};
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpthis = this;
  const tmpArgumentsAny = arguments;
  debugger;
  f.apply(tmpthis, tmpArgumentsAny);
  return undefined;
};
`````

## Output

`````js filename=intro
const f = function () {
  const tmpthis = this;
  const tmpArgumentsAny = arguments;
  debugger;
  f.apply(tmpthis, tmpArgumentsAny);
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
