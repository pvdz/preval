# Preval test case

# default_yes_no__null.md

> normalize > pattern >  > param > obj > ident > default_yes_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x = $('fail') } = null;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryConsequent;
var tmpTernaryTest;
const bindingPatternObjRoot = null;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let x;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('fail');
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
const objPatternBeforeDefault = null.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let x;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('fail');
  x = tmpTernaryConsequent;
} else {
  x = objPatternBeforeDefault;
}
$('bad');
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'x' of null ]>

Normalized calls: Same

Final output calls: Same
