# Preval test case

# spread_member.md

> normalize > array > spread_member
>
> Spread arg that is simple should not change

#TODO

## Input

`````js filename=intro
$([...true.toString.name]);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCompObj = true.toString;
const tmpArrSpread = tmpCompObj.name;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
const tmpCompObj = true.toString;
const tmpArrSpread = tmpCompObj.name;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: ['t', 'o', 'S', 't', 'r', 'i', 'n', 'g']
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
