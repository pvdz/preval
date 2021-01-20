# Preval test case

# default_yes_no__obj_missing.md

> normalize > pattern >  > param > obj > arr > default_yes_no__obj_missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] = $(['fail']) } = { a: 11, b: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = { a: 11, b: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    tmpArg = ['fail'];
    objPatternAfterDefault = $(tmpArg);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
}
const arrPatternSplat = [...objPatternAfterDefault];
$('ok');
`````

## Output

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = { a: 11, b: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  tmpArg = ['fail'];
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
[...objPatternAfterDefault];
$('ok');
`````

## Result

Should call `$` with:
[[['fail']], '<crash[ <ref> is not iterable ]>'];

Normalized calls: Same

Final output calls: Same
