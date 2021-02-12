# Preval test case

# spread_simple.md

> normalize > array > spread_simple
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
const tmpCalleeParam = [...'foo'];
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: ['f', 'o', 'o']
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
