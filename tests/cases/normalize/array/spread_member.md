# Preval test case

# spread_member.md

> Normalize > Array > Spread member
>
> Spread arg that is simple should not change

## Input

`````js filename=intro
$([...true.toString.name]);
`````

## Pre Normal


`````js filename=intro
$([...true.toString.name]);
`````

## Normalized


`````js filename=intro
const tmpCompObj = $boolean_toString;
const tmpArrSpread = tmpCompObj.name;
const tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`t`, `o`, `S`, `t`, `r`, `i`, `n`, `g`];
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "t", "o", "S", "t", "r", "i", "n", "g" ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['t', 'o', 'S', 't', 'r', 'i', 'n', 'g']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
