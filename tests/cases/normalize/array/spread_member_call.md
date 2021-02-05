# Preval test case

# spread_member_call.md

> normalize > array > spread_member_call
>
> Spread arg that is simple should not change

#TODO

## Input

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
const tmpCallCallee = $;
const tmpArrSpread = true.toString();
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: ['t', 'r', 'u', 'e']
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
