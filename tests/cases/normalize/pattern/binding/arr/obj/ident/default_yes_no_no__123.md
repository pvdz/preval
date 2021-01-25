# Preval test case

# default_yes_no_no__123.md

> normalize > pattern >  > param > arr > obj > ident > default_yes_no_no__123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [{ x = $('pass') }] = 1;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryConsequent;
var tmpTernaryTest;
const bindingPatternArrRoot = 1;
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let x;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('pass');
  x = tmpTernaryConsequent;
} else {
  x = objPatternBeforeDefault;
}
$('bad');
`````

## Output

`````js filename=intro
var tmpTernaryConsequent;
var tmpTernaryTest;
const arrPatternSplat = [...1];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let x;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('pass');
  x = tmpTernaryConsequent;
} else {
  x = objPatternBeforeDefault;
}
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
