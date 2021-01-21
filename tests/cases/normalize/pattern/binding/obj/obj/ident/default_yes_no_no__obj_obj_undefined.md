# Preval test case

# default_yes_no_no__obj_obj_undefined.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('pass') } } = { x: { x: 1, y: undefined, z: 3 }, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: undefined, z: 3 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
let y;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    y = $('pass');
  } else {
    y = objPatternBeforeDefault;
  }
}
$(y);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
tmpObjPropValue = { x: 1, y: undefined, z: 3 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
let y;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  y = $('pass');
} else {
  y = objPatternBeforeDefault;
}
$(y);
`````

## Result

Should call `$` with:
 - 0: "pass"
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
