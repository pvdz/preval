# Preval test case

# default_yes_no_no__obj_obj_0.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { y = $('fail') } } = { x: { x: 1, y: 0, z: 3 }, b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { x: 1, y: 0, z: 3 };
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $('fail');
} else {
  y = objPatternBeforeDefault;
}
tmpAssignObjPatternRhs;
$(y);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { x: 1, y: 0, z: 3 };
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $('fail');
} else {
  y = objPatternBeforeDefault;
}
$(y);
`````

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
