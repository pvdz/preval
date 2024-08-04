# Preval test case

# array_isarray_tdz_crash_order.md

> Array > Static context > Array isarray tdz crash order
>
> Array.isArray does not care about the contents

## Input

`````js filename=intro
$(Array.isArray([i_crash_first, crash_hard]));
`````

## Pre Normal


`````js filename=intro
$(Array.isArray([i_crash_first, crash_hard]));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam$1 = [i_crash_first, crash_hard];
const tmpCalleeParam = Array.isArray(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
i_crash_first;
crash_hard;
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
i_crash_first;
crash_hard;
$( true );
`````

## Globals

BAD@! Found 2 implicit global bindings:

i_crash_first, crash_hard

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
