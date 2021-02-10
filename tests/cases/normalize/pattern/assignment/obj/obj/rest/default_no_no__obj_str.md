# Preval test case

# default_no_no__obj_str.md

> normalize > pattern >  > param > obj > obj > rest > default_no_no__obj_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: { ...y } } = { x: 'abc', b: 11, c: 12 });
$(y);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = { x: 'abc', b: 11, c: 12 };
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = objPatternNoDefault;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$2 = undefined;
y = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
$(y);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { 0: '"a"', 1: '"b"', 2: '"c"' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
