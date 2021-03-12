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

## Normalized

`````js filename=intro
const f = function (a) {
  a = unknown;
};
f();
`````

## Output

`````js filename=intro
const f = function (a) {
  unknown;
};
f();
`````

## Globals

BAD@! Found 1 implicit global bindings:

unknown

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
