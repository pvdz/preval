# Preval test case

# default_yes__0.md

> normalize > pattern >  > param > ident > default_yes__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(x = 'fail') {
  return x;
}
$(f(0, 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__x) {
  let x;
  {
    let ifTestTmp = $tdz$__x === undefined;
    if (ifTestTmp) {
      x = 'fail';
    } else {
      x = $tdz$__x;
    }
  }
  return x;
}
var tmpArg;
('<hoisted var `tmpArg` decl without init>');
tmpArg = f(0, 200);
$(tmpArg);
`````

## Output

`````js filename=intro
function f($tdz$__x) {
  let x;
  let ifTestTmp = $tdz$__x === undefined;
  if (ifTestTmp) {
    x = 'fail';
  } else {
    x = $tdz$__x;
  }
  return x;
}
var tmpArg;
tmpArg = f(0, 200);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: undefined

Normalized calls: Same

Final output calls: Same
