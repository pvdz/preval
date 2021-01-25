# Preval test case

# default_yes_no_no__obj_0.md

> normalize > pattern >  > param > obj > obj > ident > default_yes_no_no__obj_0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { y = $('pass') } } = { x: 0, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
var tmpTernaryConsequent;
var tmpTernaryTest;
const bindingPatternObjRoot = { x: 0, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let y;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('pass');
  y = tmpTernaryConsequent;
} else {
  y = objPatternBeforeDefault;
}
$(y);
`````

## Output

`````js filename=intro
var tmpTernaryConsequent;
var tmpTernaryTest;
const bindingPatternObjRoot = { x: 0, b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let y;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('pass');
  y = tmpTernaryConsequent;
} else {
  y = objPatternBeforeDefault;
}
$(y);
`````

## Result

Should call `$` with:
 - 0: "pass"
 - 1: "pass"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
