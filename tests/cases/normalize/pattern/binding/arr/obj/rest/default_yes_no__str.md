# Preval test case

# default_yes_no__str.md

> normalize > pattern >  > param > arr > obj > rest > default_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ ...x } = $({ a: 'fail' })] = 'abc';
$(x);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryTest;
const bindingPatternArrRoot = 'abc';
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
let arrPatternStep;
if (tmpTernaryTest) {
  tmpArg = { a: 'fail' };
  tmpTernaryConsequent = $(tmpArg);
  arrPatternStep = tmpTernaryConsequent;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const x = objPatternRest(arrPatternStep, [], undefined);
$(x);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryTest;
const arrPatternSplat = [...'abc'];
const arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
let arrPatternStep;
if (tmpTernaryTest) {
  tmpArg = { a: 'fail' };
  tmpTernaryConsequent = $(tmpArg);
  arrPatternStep = tmpTernaryConsequent;
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const x = objPatternRest(arrPatternStep, [], undefined);
$(x);
`````

## Result

Should call `$` with:
 - 0: {"0":"a"}
 - 1: undefined

Normalized calls: Same

Final output calls: Same
