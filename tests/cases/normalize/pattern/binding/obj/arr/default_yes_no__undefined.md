# Preval test case

# default_yes_no__undefined.md

> normalize > pattern >  > param > obj > arr > default_yes_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [] = $(['fail']) } = undefined;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = undefined;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = ['fail'];
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
$('bad');
`````

## Output

`````js filename=intro
var tmpArg;
const objPatternBeforeDefault = undefined.x;
let objPatternAfterDefault;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = ['fail'];
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
[...objPatternAfterDefault];
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'x' of undefined ]>

Normalized calls: Same

Final output calls: Same
