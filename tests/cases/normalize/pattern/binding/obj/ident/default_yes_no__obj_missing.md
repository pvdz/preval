# Preval test case

# default_yes_no__obj_missing.md

> normalize > pattern >  > param > obj > ident > default_yes_no__obj_missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x = $('pass') } = { b: 2, c: 3 };
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { b: 2, c: 3 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
{
  let x;
  {
    let ifTestTmp = objPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      x = $('pass');
    } else {
      x = objPatternBeforeDefault;
    }
  }
}
$(x);
`````

## Uniformed

`````js filename=intro
var x = { x: 8, x: 8 };
var x = x.x;
{
  var x;
  {
    var x = x * x;
    if (x) {
      x = x('str');
    } else {
      x = x;
    }
  }
}
x(x);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { b: 2, c: 3 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let x;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  x = $('pass');
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````
