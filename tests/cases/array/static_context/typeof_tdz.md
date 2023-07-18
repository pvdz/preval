# Preval test case

# typeof_tdz.md

> Array > Static context > Typeof tdz
>
> Calling Boolean on arrays trigger spies

#TODO

## Input

`````js filename=intro
$(typeof [crash_hard]);
`````

## Pre Normal

`````js filename=intro
$(typeof [crash_hard]);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = [crash_hard];
const tmpCalleeParam = typeof tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
crash_hard;
$(`object`);
`````

## PST Output

With rename=true

`````js filename=intro
crash_hard;
$( "object" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

crash_hard

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
