# Preval test case

# default_yes_no__0.md

> normalize > pattern >  > param > obj > arr > rest > default_yes_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: [...y] = $(['pass']) } = 0;
$(y);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryTest;
const bindingPatternObjRoot = 0;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let objPatternAfterDefault;
if (tmpTernaryTest) {
  tmpArg = ['pass'];
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const y = arrPatternSplat.slice(0);
$(y);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryTest;
const objPatternBeforeDefault = (0).x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let objPatternAfterDefault;
if (tmpTernaryTest) {
  tmpArg = ['pass'];
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const y = arrPatternSplat.slice(0);
$(y);
`````

## Result

Should call `$` with:
 - 0: ["pass"]
 - 1: ["pass"]
 - 2: undefined

Normalized calls: Same

Final output calls: Same
