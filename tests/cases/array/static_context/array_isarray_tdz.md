# Preval test case

# array_isarray_tdz.md

> Array > Static context > Array isarray tdz
>
> Array.isArray does not care about the contents

#TODO

## Input

`````js filename=intro
$(Array.isArray([crash_hard]));
`````

## Pre Normal

`````js filename=intro
$(Array.isArray([crash_hard]));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam$1 = [crash_hard];
const tmpCalleeParam = Array.isArray(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
crash_hard;
$(true);
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
