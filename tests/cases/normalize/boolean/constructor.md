# Preval test case

# constructor.md

> Normalize > Boolean > Constructor
>
> The .constructor property should resolve to Number

## Input

`````js filename=intro
$(false.constructor("300"));
`````

## Pre Normal


`````js filename=intro
$(false.constructor(`300`));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = true;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
