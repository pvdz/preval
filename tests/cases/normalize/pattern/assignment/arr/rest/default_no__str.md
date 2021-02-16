# Preval test case

# default_no__str.md

> normalize > pattern >  > param > arr > rest > default_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([...x] = 'abc');
$(x);
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = 'abc';
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat.slice(0);
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = ['a', 'b', 'c'];
x = arrPatternSplat.slice(0);
$(x);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: ['a', 'b', 'c']
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
