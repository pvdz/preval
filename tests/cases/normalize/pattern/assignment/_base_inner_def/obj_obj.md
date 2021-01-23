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
var objPatternBeforeDefault;
var objPatternNoDefault;
var objPatternNoDefault$1;
var tmpTernaryTest;
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault$1 = objPatternNoDefault.y;
objPatternBeforeDefault = objPatternNoDefault$1.z;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  z = a;
} else {
  z = objPatternBeforeDefault;
}
objAssignPatternRhs;
`````

## Output

`````js filename=intro
var objAssignPatternRhs;
var objPatternBeforeDefault;
var objPatternNoDefault;
var objPatternNoDefault$1;
var tmpTernaryTest;
objAssignPatternRhs = 1;
objPatternNoDefault = objAssignPatternRhs.x;
objPatternNoDefault$1 = objPatternNoDefault.y;
objPatternBeforeDefault = objPatternNoDefault$1.z;
tmpTernaryTest = objPatternBeforeDefault === undefined;
if (tmpTernaryTest) {
  z = a;
} else {
  z = objPatternBeforeDefault;
}
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'y' of undefined ]>

Normalized calls: Same

Final output calls: Same
