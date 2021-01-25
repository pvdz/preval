# Preval test case

# default_yes_no__empty.md

> normalize > pattern >  > param > obj > ident > default_yes_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x = $('fail') } = 1;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpTernaryConsequent;
var tmpTernaryTest;
const bindingPatternObjRoot = 1;
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
const objPatternBeforeDefault = (1).x;
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
 - 0: "fail"
 - 1: "bad"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
