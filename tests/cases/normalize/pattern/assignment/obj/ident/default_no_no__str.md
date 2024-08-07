# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Assignment > Obj > Ident > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x } = 'abc');
$(x);
`````

## Pre Normal


`````js filename=intro
({ x: x } = `abc`);
$(x);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = `abc`;
x = tmpAssignObjPatternRhs.x;
$(x);
`````

## Output


`````js filename=intro
x = `abc`.x;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
x = "abc".x;
$( x );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
