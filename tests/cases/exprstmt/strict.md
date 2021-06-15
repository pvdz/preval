# Preval test case

# strict.md

> Exprstmt > Strict
>
> String as statement can be eliminated, even "use strict", because we assume module goal

## Input

`````js filename=intro
"use strict";
`````

## Pre Normal

`````js filename=intro
`use strict`;
`````

## Normalized

`````js filename=intro

`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
