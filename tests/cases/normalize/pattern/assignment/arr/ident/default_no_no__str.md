# Preval test case

# default_no_no__str.md

> normalize > pattern >  > param > arr > ident > default_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([x] = 'abc');
$(x);
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = 'abc';
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
arrAssignPatternRhs;
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = [...'abc'];
x = arrPatternSplat[0];
$(x);
`````

## Result

Should call `$` with:
 - 1: 'a'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
