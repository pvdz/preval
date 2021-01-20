# Preval test case

# default_yes_no_no__obj_obj_missing.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_obj_missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('pass') } } = { x: { x: 1, z: 3 }, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
tmpObjPropValue = { x: 1, z: 3 };
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
tmpObjPropValue = { x: 1, z: 3 };
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
[['pass'], [null], null];

Normalized calls: Same

Final output calls: Same
