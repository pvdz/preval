# Preval test case

# default_yes__empty_str.md

> normalize > pattern >  > param > ident > default_yes__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(x = 'pass') {
  return x;
}
$(f('', 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__x) {
  {
    let x;
    {
      let ifTestTmp = $tdz$__x === undefined;
      if (ifTestTmp) {
        x = 'pass';
      } else {
        x = $tdz$__x;
      }
    }
  }
  return x;
}
var tmpArg;
tmpArg = f('', 200);
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
tmpArg = f('', 200);
$(tmpArg);
`````

## Result

Should call `$` with:
[[''], null];

Normalized calls: BAD?!
[[{ 0: 'a', 1: 'b', 2: 'c' }], null];

Final output calls: Same
