# Preval test case

# default_yes_yes_no__undefined.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } = $({ y: 'fail2' }) } = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = undefined;
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
$('bad');
`````

## Output

`````js filename=intro
var tmpArg;
const objPatternBeforeDefault = undefined.x;
let objPatternAfterDefault;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = { y: 'fail2' };
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
$('bad');
`````

## Result

Should call `$` with:
["<crash[ Cannot read property 'x' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
