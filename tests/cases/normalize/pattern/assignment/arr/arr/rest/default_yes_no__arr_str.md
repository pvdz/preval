# Preval test case

# default_yes_no__arr_str.md

> normalize > pattern >  > param > arr > arr > rest > default_yes_no__arr_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[...x] = $('fail')] = ['abc', 4, 5]);
$(x);
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = ['abc', 4, 5];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  arrPatternStep = $('fail');
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
x = arrPatternSplat$1.slice(0);
$(x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: ['a', 'b', 'c']
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
