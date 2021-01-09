# Preval test case

# default_yes_no__empty_str.md

> normalize > pattern >  > param > arr > ident > default_yes_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([x = $('pass')] = '');
$(x);
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var x;
arrAssignPatternRhs = '';
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
x = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : arrPatternBeforeDefault;
$(x);
`````

## Uniformed

`````js filename=intro
var x;
var x;
var x;
var x;
var x;
var x;
x = 'str';
x = [...x];
x = x[8];
x = x * x;
x = x ? ((x = x('str')), x) : x;
x(x);
`````

## Output

`````js filename=intro
var tmpTernaryTest;
var tmpTernaryConsequent;
var arrAssignPatternRhs;
var arrPatternSplat;
var arrPatternBeforeDefault;
var x;
arrAssignPatternRhs = '';
arrPatternSplat = [...arrAssignPatternRhs];
arrPatternBeforeDefault = arrPatternSplat[0];
tmpTernaryTest = arrPatternBeforeDefault === undefined;
x = tmpTernaryTest ? ((tmpTernaryConsequent = $('pass')), tmpTernaryConsequent) : arrPatternBeforeDefault;
$(x);
`````
