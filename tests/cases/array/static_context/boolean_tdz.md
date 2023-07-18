# Preval test case

# boolean_tdz.md

> Array > Static context > Boolean tdz
>
> Calling Boolean on arrays trigger spies

#TODO

## Input

`````js filename=intro
$(Boolean([crash_hard]));
`````

## Pre Normal

`````js filename=intro
$(Boolean([crash_hard]));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCallCallee$1 = Boolean;
const tmpCalleeParam$1 = [crash_hard];
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
crash_hard;
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
crash_hard;
$( true );
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
