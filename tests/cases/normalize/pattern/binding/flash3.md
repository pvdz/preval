# Preval test case

# flash3.md

> Normalize > Pattern > Binding > Flash3
>
> Regression hunting 

Derived from `function x(foo = x, {x}) {}`

## Input

`````js filename=intro
const f = function (a) {
  a = unknown; // This is correct. The default refers to a following param which is tdz
};
f();
`````

## Pre Normal

`````js filename=intro
const f = function ($$0) {
  let a = $$0;
  debugger;
  a = unknown;
};
f();
`````

## Normalized

`````js filename=intro
const f = function ($$0) {
  let a = $$0;
  debugger;
  a = unknown;
};
f();
`````

## Output

`````js filename=intro
unknown;
`````

## Globals

BAD@! Found 1 implicit global bindings:

unknown

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
