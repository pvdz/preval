# Preval test case

# obj_obj.md

> normalize > pattern > param > _base > obj_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({x: {y: {z = a }}} = 1);
`````

## Normalized

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
var objPatternBeforeDefault;
var tmpTernaryTest;
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
objPatternBeforeDefault = objPatternNoDefault_1.z;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  z = a;
} else {
  z = objPatternBeforeDefault;
}
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternNoDefault;
var objPatternNoDefault_1;
var objPatternBeforeDefault;
var tmpTernaryTest;
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault_1 = objPatternNoDefault.y;
objPatternBeforeDefault = objPatternNoDefault_1.z;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  z = a;
} else {
  z = objPatternBeforeDefault;
}
`````

## Result

Should call `$` with:
["<crash[ Cannot read property 'y' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
