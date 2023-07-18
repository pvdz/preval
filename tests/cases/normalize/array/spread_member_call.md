# Preval test case

# spread_member_call.md

> Normalize > Array > Spread member call
>
> Spread arg that is simple should not change

#TODO

## Input

`````js filename=intro
$([...true.toString()]);
`````

## Pre Normal

`````js filename=intro
$([...true.toString()]);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpArrSpread = true.toString();
const tmpCalleeParam = [...tmpArrSpread];
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
const a = [ "t", "r", "u", "e",, ];
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
