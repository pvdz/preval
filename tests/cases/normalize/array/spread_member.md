# Preval test case

# spread_member.md

> Normalize > Array > Spread member
>
> Spread arg that is simple should not change

#TODO

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
const tmpCallCallee = $;
const tmpCompObj = $Boolean_toString;
const tmpArrSpread = tmpCompObj.name;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpArrSpread = $Boolean_toString.name;
const tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $Boolean_toString.name;
const b = [ ... a,, ];
$( b );
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
