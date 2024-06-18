# Preval test case

# spread_member_call2.md

> Normalize > Array > Spread member call2
>
> Spread arg that is simple should not change

## Input

`````js filename=intro
$([...'true']);
`````

## Pre Normal


`````js filename=intro
$([...`true`]);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [`t`, `r`, `u`, `e`];
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam = [`t`, `r`, `u`, `e`];
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "t", "r", "u", "e" ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['t', 'r', 'u', 'e']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
