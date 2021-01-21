# Preval test case

# default_yes__null.md

> normalize > pattern >  > param > ident > default_yes__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(x = 'fail') {
  return x;
}
$(f(null, 200));
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
tmpArg = f(null, 200);
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
tmpArg = f(null, 200);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
