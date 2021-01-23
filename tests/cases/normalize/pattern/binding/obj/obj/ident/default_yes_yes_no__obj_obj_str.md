# Preval test case

# default_yes_yes_no__obj_obj_str.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } = $({ y: 'fail2' }) } = { x: { x: 1, y: 'abc', z: 3 }, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpObjPropValue;
var tmpArg;
tmpObjPropValue = { x: 1, y: 'abc', z: 3 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = { y: 'fail2' };
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
let y;
{
  let ifTestTmp$1 = objPatternBeforeDefault$1 === undefined;
  if (ifTestTmp$1) {
    y = $('fail');
  } else {
    y = objPatternBeforeDefault$1;
  }
}
$(y);
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpArg;
tmpObjPropValue = { x: 1, y: 'abc', z: 3 };
const bindingPatternObjRoot = { x: tmpObjPropValue, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = { y: 'fail2' };
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
let y;
let ifTestTmp$1 = objPatternBeforeDefault$1 === undefined;
if (ifTestTmp$1) {
  y = $('fail');
} else {
  y = objPatternBeforeDefault$1;
}
$(y);
`````

## Result

Should call `$` with:
 - 0: "abc"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
