# Preval test case

# default_yes_no__obj_123.md

> normalize > pattern >  > param > obj > arr > default_yes_no__obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] = $(['fail']) } = { x: 1, a: 2, b: 3 };
$('ok');
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = { x: 1, a: 2, b: 3 };
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
const bindingPatternObjRoot = { x: 1, a: 2, b: 3 };
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
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
