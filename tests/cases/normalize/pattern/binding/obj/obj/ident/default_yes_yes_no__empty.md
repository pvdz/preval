# Preval test case

# default_yes_yes_no__empty.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_yes_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('fail') } = $({ y: 'fail2' }) } = 1;
$('bad');
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryConsequent$1;
var tmpTernaryTest;
var tmpTernaryTest$1;
const bindingPatternObjRoot = 1;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let objPatternAfterDefault;
if (tmpTernaryTest) {
  tmpArg = { y: 'fail2' };
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
tmpTernaryTest$1 = objPatternBeforeDefault$1 === undefined;
let y;
if (tmpTernaryTest$1) {
  tmpTernaryConsequent$1 = $('fail');
  y = tmpTernaryConsequent$1;
} else {
  y = objPatternBeforeDefault$1;
}
$('bad');
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryConsequent;
var tmpTernaryConsequent$1;
var tmpTernaryTest;
var tmpTernaryTest$1;
const objPatternBeforeDefault = (1).x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let objPatternAfterDefault;
if (tmpTernaryTest) {
  tmpArg = { y: 'fail2' };
  tmpTernaryConsequent = $(tmpArg);
  objPatternAfterDefault = tmpTernaryConsequent;
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
tmpTernaryTest$1 = objPatternBeforeDefault$1 === undefined;
let y;
if (tmpTernaryTest$1) {
  tmpTernaryConsequent$1 = $('fail');
  y = tmpTernaryConsequent$1;
} else {
  y = objPatternBeforeDefault$1;
}
$('bad');
`````

## Result

Should call `$` with:
 - 0: {"y":"fail2"}
 - 1: "bad"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
