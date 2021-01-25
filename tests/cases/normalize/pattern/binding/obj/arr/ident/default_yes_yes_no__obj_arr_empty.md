# Preval test case

# default_yes_yes_no__obj_arr_empty.md

> normalize > pattern >  > param > obj > arr > ident > default_yes_yes_no__obj_arr_empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [y = 'pass'] = $(['fail2']) } = { x: [], a: 11, b: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryTest;
var tmpTernaryTest$1;
const bindingPatternObjRoot = { x: [], a: 11, b: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let objPatternAfterDefault;
if (tmpTernaryTest) {
  tmpArg = ['fail2'];
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
  y = 'pass';
} else {
  y = arrPatternBeforeDefault;
}
$(y);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryTest;
var tmpTernaryTest$1;
const bindingPatternObjRoot = { x: [], a: 11, b: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let objPatternAfterDefault;
if (tmpTernaryTest) {
  tmpArg = ['fail2'];
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
  y = 'pass';
} else {
  y = arrPatternBeforeDefault;
}
$(y);
`````

## Result

Should call `$` with:
 - 0: "pass"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
