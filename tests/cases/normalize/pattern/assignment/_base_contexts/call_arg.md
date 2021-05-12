# Preval test case

# call_arg.md

> Normalize > Pattern > Assignment > Base contexts > Call arg
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
let x = 0;
$({ x } = 1);
`````

## Pre Normal

`````js filename=intro
let x = 0;
$(({ x: x } = 1));
`````

## Normalized

`````js filename=intro
let x = 0;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpNestedAssignObjPatternRhs = 1;
x = tmpNestedAssignObjPatternRhs.x;
tmpCalleeParam = tmpNestedAssignObjPatternRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
(1).x;
$(1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
