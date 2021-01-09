# Preval test case

# obj_obj.md

> normalize > pattern > param > _base > obj_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const {x: {y: {z = a }}} = 1;
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1;
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
const objPatternBeforeDefault = objPatternNoDefault_1.z;
{
  let z;
  {
    let ifTestTmp = objPatternBeforeDefault === undefined;
    if (ifTestTmp) {
      z = a;
    } else {
      z = objPatternBeforeDefault;
    }
  }
}
`````

## Uniformed

`````js filename=intro
var x = 8;
var x = x.x;
var x = x.x;
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
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
const objPatternNoDefault_1 = objPatternNoDefault.y;
const objPatternBeforeDefault = objPatternNoDefault_1.z;
let z;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  z = a;
} else {
  z = objPatternBeforeDefault;
}
`````
