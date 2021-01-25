# Preval test case

# default_yes_no_no__obj_obj_123.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } } = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpTernaryConsequent;
var tmpTernaryTest;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let y;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('fail');
  y = tmpTernaryConsequent;
} else {
  y = objPatternBeforeDefault;
}
$(y);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpTernaryConsequent;
var tmpTernaryTest;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let y;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('fail');
  y = tmpTernaryConsequent;
} else {
  y = objPatternBeforeDefault;
}
$(y);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: undefined

Normalized calls: Same

Final output calls: Same
