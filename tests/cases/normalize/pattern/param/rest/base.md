# Preval test case

# base.md

> Normalize > Pattern > Param > Rest > Base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const f = function(...x) {
  return x;
}
const r = f(1, 2, 3);
$(r);
`````

## Pre Normal

`````js filename=intro
const f = function (...$$0) {
  let x = $$0;
  debugger;
  return x;
};
const r = f(1, 2, 3);
$(r);
`````

## Normalized

`````js filename=intro
const f = function (...$$0) {
  let x = $$0;
  debugger;
  return x;
};
const r = f(1, 2, 3);
$(r);
`````

## Output

`````js filename=intro
const f = function (...$$0) {
  const x = $$0;
  debugger;
  return x;
};
const r = f(1, 2, 3);
$(r);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
