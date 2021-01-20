# Preval test case

# default_yes__arr_empty.md

> normalize > pattern >  > param > ident > default_yes__arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(x = 'pass') {
  return x;
}
$(f());
`````

## Normalized

`````js filename=intro
function f($tdz$__x) {
  let x;
  {
    let ifTestTmp = $tdz$__x === undefined;
    if (ifTestTmp) {
      x = 'pass';
    } else {
      x = $tdz$__x;
    }
  }
  return x;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f($tdz$__x) {
  let x;
  let ifTestTmp = $tdz$__x === undefined;
  if (ifTestTmp) {
    x = 'pass';
  } else {
    x = $tdz$__x;
  }
  return x;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
[['pass'], null];

Normalized calls: Same

Final output calls: Same
