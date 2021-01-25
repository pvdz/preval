# Preval test case

# default_yes_no_no__empty.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } } = 1;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryConsequent;
var tmpTernaryTest;
const bindingPatternObjRoot = 1;
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
const objPatternNoDefault = (1).x;
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
