# Preval test case

# obj_unique.md

> Normalize > Pattern > Assignment > Base alias > Obj unique
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

Confirm that both references of `x` get a unique name.

In particular, the pattern's "y" should be replaced with a different name.

## Input

`````js filename=intro
{ let a = 1; }
({ x: a } = 1);
{ let a = 1; }
`````

## Pre Normal

`````js filename=intro
{
  let a = 1;
}
({ x: a$1 } = 1);
{
  let a$3 = 1;
}
`````

## Normalized

`````js filename=intro
let a = 1;
const tmpAssignObjPatternRhs = 1;
a$1 = tmpAssignObjPatternRhs.x;
let a$3 = 1;
`````

## Output

`````js filename=intro
a$1 = (1).x;
`````

## Globals

BAD@! Found 1 implicit global bindings:

a$1

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
