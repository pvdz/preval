# Preval test case

# strict.md

> exprstmt > strict
>
> String as statement can be eliminated, even "use strict", because we assume module goal

## Input

`````js filename=intro
"use strict";
`````

## Normalized

`````js filename=intro

`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
