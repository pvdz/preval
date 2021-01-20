# Preval test case

# default_yes_no__obj_empty.md

> normalize > pattern >  > param > obj > obj > default_yes_no__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: {} = $({ x: 'pass' }) } = {};
$('ok');
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = {};
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = { x: 'pass' };
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
}
$('ok');
`````

## Output

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = {};
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = { x: 'pass' };
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
$('ok');
`````

## Result

Should call `$` with:
[[{ x: 'pass' }], "<crash[ Cannot destructure '$(...)' as it is undefined. ]>"];

Normalized calls: BAD?!
[[{ x: 'pass' }], ['ok'], null];

Final output calls: BAD!!
[[{ x: 'pass' }], ['ok'], null];

