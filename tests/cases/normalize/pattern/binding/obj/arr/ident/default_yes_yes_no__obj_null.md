# Preval test case

# default_yes_yes_no__obj_null.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__obj_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'fail'] = $(['fail2']) } = { x: null, a: 11, b: 12 };
$('bad');
`````

## Normalized

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = { x: null, a: 11, b: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = ['fail2'];
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
let y;
const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  y = 'fail';
} else {
  y = arrPatternBeforeDefault;
}
$('bad');
`````

## Output

`````js filename=intro
var tmpArg;
const bindingPatternObjRoot = { x: null, a: 11, b: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = ['fail2'];
  objPatternAfterDefault = $(tmpArg);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
let y;
const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  y = 'fail';
} else {
  y = arrPatternBeforeDefault;
}
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
