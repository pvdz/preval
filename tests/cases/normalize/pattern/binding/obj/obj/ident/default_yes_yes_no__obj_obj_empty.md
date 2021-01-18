# Preval test case

# default_yes_yes_no__obj_obj_empty.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__obj_obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('pass') } = $({ y: 'fail2' }) } = { x: {}, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = { x: {}, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
{
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
}
const objPatternBeforeDefault_1 = objPatternAfterDefault.y;
{
  let y;
  {
    let ifTestTmp_1 = objPatternBeforeDefault_1 === undefined;
    if (ifTestTmp_1) {
      y = $('pass');
    } else {
      y = objPatternBeforeDefault_1;
    }
  }
}
$(y);
`````

## Output

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = { x: {}, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
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
  y = $('pass');
} else {
  y = objPatternBeforeDefault_1;
}
$(y);
`````

## Result

Should call `$` with:
[['pass'], [null], null];

Normalized calls: BAD?!
['<crash[ <ref> is not defined ]>'];

Final output calls: Same
