# Preval test case

# arguments.md

> Normalize > Arguments > Arguments
>
> Arguments is a special global

#TODO

## Input

`````js filename=intro
function f() {
  arguments;
}
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  null;
};
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  return undefined;
};
`````

## Output

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
