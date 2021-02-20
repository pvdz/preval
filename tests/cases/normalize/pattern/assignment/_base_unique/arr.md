# Preval test case

# 1.md

> normalize > pattern > param > _base > 1
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; } 
([ x ] = [ 100 ]);
{ let x = 1; }
$(x);
`````

## Normalized

`````js filename=intro
let x = 1;
const arrAssignPatternRhs = [100];
const arrPatternSplat = [...arrAssignPatternRhs];
x$1 = arrPatternSplat[0];
let x$2 = 1;
$(x$1);
`````

## Output

`````js filename=intro
const arrAssignPatternRhs = [100];
const arrPatternSplat = [...arrAssignPatternRhs];
x$1 = arrPatternSplat[0];
$(x$1);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x$1

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
