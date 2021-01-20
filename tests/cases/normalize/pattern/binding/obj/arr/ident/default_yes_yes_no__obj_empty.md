# Preval test case

# default_yes_yes_no__obj_empty.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__obj_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'fail'] = $(['pass2']) } = {};
$(y);
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
    tmpArg = ['pass2'];
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
}
const arrPatternSplat = [...objPatternAfterDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
let y;
{
  let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
  if (ifTestTmp_1) {
    y = 'fail';
  } else {
    y = arrPatternBeforeDefault;
  }
}
$(y);
`````

## Output

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = {};
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = ['pass2'];
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
let y;
let ifTestTmp_1 = arrPatternBeforeDefault === undefined;
if (ifTestTmp_1) {
  y = 'fail';
} else {
  y = arrPatternBeforeDefault;
}
$(y);
`````

## Result

Should call `$` with:
[[['pass2']], '<crash[ <ref> is not iterable ]>'];

Normalized calls: Same

Final output calls: Same
