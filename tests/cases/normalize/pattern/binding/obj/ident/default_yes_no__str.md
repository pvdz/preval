# Preval test case

# default_yes_no__str.md

> normalize > pattern >  > param > obj > ident > default_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x = $('pass') } = 'abc';
$(x);
`````

## Normalized

`````js filename=intro
var tmpTernaryConsequent;
var tmpTernaryTest;
const bindingPatternObjRoot = 'abc';
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let x;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('pass');
  x = tmpTernaryConsequent;
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Output

`````js filename=intro
var tmpTernaryConsequent;
var tmpTernaryTest;
const objPatternBeforeDefault = 'abc'.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let x;
if (tmpTernaryTest) {
  tmpTernaryConsequent = $('pass');
  x = tmpTernaryConsequent;
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Result

Should call `$` with:
 - 0: "pass"
 - 1: "pass"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
