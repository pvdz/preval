# Preval test case

# spread_simple.md

> Normalize > Array > Spread simple
>
> Spread arg that is simple should not change

#TODO

## Input

`````js filename=intro
const x = "foo";
$([...x]);
`````

## Normalized

`````js filename=intro
const x = 'foo';
const tmpCallCallee = $;
const tmpCalleeParam = [...x];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['f', 'o', 'o'];
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['f', 'o', 'o']
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
