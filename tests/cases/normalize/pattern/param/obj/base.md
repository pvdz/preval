# Preval test case

# base.md

> normalize > pattern > param > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({}) {
  return 'ok';
}
$(f({ a: 1, b: 2, c: 3 }, 10));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  return 'ok';
}
var tmpArg;
var tmpArg_1;
tmpArg_1 = { a: 1, b: 2, c: 3 };
tmpArg = f(tmpArg_1, 10);
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
tmpArg_1 = { a: 1, b: 2, c: 3 };
tmpArg = 'ok';
$(tmpArg);
`````

## Result

Should call `$` with:
[['ok'], null];

Normalized calls: Same

Final output calls: Same
