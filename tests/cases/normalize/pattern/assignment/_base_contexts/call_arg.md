# Preval test case

# call_arg.md

> Normalize > Pattern > Assignment > Base contexts > Call arg
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
f({ x } = 1);
`````

## Pre Normal

`````js filename=intro
f(({ x } = 1));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = f;
let tmpCalleeParam = undefined;
const tmpNestedAssignObjPatternRhs = 1;
x = tmpNestedAssignObjPatternRhs.x;
tmpCalleeParam = tmpNestedAssignObjPatternRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = f;
x = (1).x;
tmpCallCallee(1);
`````

## Globals

BAD@! Found 2 implicit global bindings:

f, x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
