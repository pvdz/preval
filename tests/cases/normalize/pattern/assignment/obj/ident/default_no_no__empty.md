# Preval test case

# default_no_no__empty.md

> normalize > pattern >  > param > obj > ident > default_no_no__empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x } = 1);
$('bad');
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = 1;
x = tmpAssignObjPatternRhs.x;
tmpAssignObjPatternRhs;
$('bad');
`````

## Output

`````js filename=intro
x = (1).x;
$('bad');
`````

## Result

Should call `$` with:
 - 1: 'bad'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
