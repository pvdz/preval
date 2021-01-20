# Preval test case

# default_yes_yes_no__obj_missing.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } = $({ y: 'pass2' }) } = { b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = { b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = { y: 'pass2' };
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
}
const objPatternBeforeDefault_1 = objPatternAfterDefault.y;
let y;
{
  let ifTestTmp_1 = objPatternBeforeDefault_1 === undefined;
  if (ifTestTmp_1) {
    y = $('fail');
  } else {
    y = objPatternBeforeDefault_1;
  }
}
$(y);
`````

## Output

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = { b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = { y: 'pass2' };
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault_1 = objPatternAfterDefault.y;
let y;
let ifTestTmp_1 = objPatternBeforeDefault_1 === undefined;
if (ifTestTmp_1) {
  y = $('fail');
} else {
  y = objPatternBeforeDefault_1;
}
$(y);
`````

## Result

Should call `$` with:
[[{ y: 'pass2' }], "<crash[ Cannot read property 'y' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
