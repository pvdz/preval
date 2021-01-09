# Preval test case

# base.md

> normalize > pattern >  > param > obj > obj > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: {} = a } = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
{
  let objPatternAfterDefault;
  {
    let ifTestTmp = objPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      objPatternAfterDefault = a;
    } else {
      objPatternAfterDefault = objPatternBeforeDefault;
    }
  }
}
$('ok');
`````

## Uniformed

`````js filename=intro
var x;
x = { x: 8, x: 8, x: 8 };
var x = { x: x, x: 8, x: 8 };
var x = x.x;
{
  var x;
  {
    var x = x * x;
    if (x) {
      x = x;
    } else {
      x = x;
    }
  }
}
x('str');
`````

## Output

`````js filename=intro
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  objPatternAfterDefault = a;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
$('ok');
`````
