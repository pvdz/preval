# Preval test case

# default_yes_yes_no__obj_undefined.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'fail'] = $(['pass2']) } = { x: undefined, a: 11, b: 12 };
$('bad');
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryTest;
var tmpTernaryTest$1;
const bindingPatternObjRoot = { x: undefined, a: 11, b: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let objPatternAfterDefault;
if (tmpTernaryTest) {
  tmpArg = ['pass2'];
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest$1 = arrPatternBeforeDefault === undefined;
let y;
if (tmpTernaryTest$1) {
  y = 'fail';
} else {
  y = arrPatternBeforeDefault;
}
$('bad');
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryTest;
var tmpTernaryTest$1;
const bindingPatternObjRoot = { x: undefined, a: 11, b: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let objPatternAfterDefault;
if (tmpTernaryTest) {
  tmpArg = ['pass2'];
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest$1 = arrPatternBeforeDefault === undefined;
let y;
if (tmpTernaryTest$1) {
  y = 'fail';
} else {
  y = arrPatternBeforeDefault;
}
$('bad');
`````

## Result

Should call `$` with:
 - 0: ["pass2"]
 - 1: "bad"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
