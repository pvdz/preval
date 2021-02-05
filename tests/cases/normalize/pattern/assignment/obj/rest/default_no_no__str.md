# Preval test case

# default_no_no__str.md

> normalize > pattern >  > param > obj > rest > default_no_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ ...x } = 'abc');
$(x);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = 'abc';
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = tmpAssignObjPatternRhs;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$2 = 'x';
x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
tmpAssignObjPatternRhs;
$(x);
`````

## Output

`````js filename=intro
const tmpCallCallee = objPatternRest;
const tmpCalleeParam$1 = [];
x = tmpCallCallee('abc', tmpCalleeParam$1, 'x');
$(x);
`````

## Result

Should call `$` with:
 - 1: { 0: '"a"', 1: '"b"', 2: '"c"' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
