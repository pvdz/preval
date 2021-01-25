# Preval test case

# default_yes_no__obj_obj_123.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_no__obj_obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { ...y } = $({ a: 'fail' }) } = { x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
var tmpTernaryConsequent;
var tmpTernaryTest;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let objPatternAfterDefault;
if (tmpTernaryTest) {
  tmpArg = { a: 'fail' };
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const y = objPatternRest(objPatternAfterDefault, [], undefined);
$(y);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpObjPropValue;
var tmpTernaryConsequent;
var tmpTernaryTest;
tmpObjPropValue = { x: 1, y: 2, z: 3 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let objPatternAfterDefault;
if (tmpTernaryTest) {
  tmpArg = { a: 'fail' };
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const y = objPatternRest(objPatternAfterDefault, [], undefined);
$(y);
`````

## Result

Should call `$` with:
 - 0: {"x":1,"y":2,"z":3}
 - 1: undefined

Normalized calls: Same

Final output calls: Same
