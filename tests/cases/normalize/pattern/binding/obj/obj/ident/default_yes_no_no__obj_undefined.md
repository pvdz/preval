# Preval test case

# default_yes_no_no__obj_undefined.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } } = { x: undefined, b: 11, c: 12 };
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryConsequent;
var tmpTernaryTest;
const bindingPatternObjRoot = { x: undefined, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let y;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('fail');
  y = tmpTernaryConsequent;
} else {
  y = objPatternBeforeDefault;
}
$('bad');
`````

## Output

`````js filename=intro
var tmpTernaryConsequent;
var tmpTernaryTest;
const bindingPatternObjRoot = { x: undefined, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let y;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('fail');
  y = tmpTernaryConsequent;
} else {
  y = objPatternBeforeDefault;
}
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'y' of undefined ]>

Normalized calls: Same

Final output calls: Same
