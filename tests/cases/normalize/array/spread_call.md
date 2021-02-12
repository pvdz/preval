# Preval test case

# spread_call.md

> normalize > array > spread_call
>
> Spread arg that is simple should not change

#TODO

## Input

`````js filename=intro
$([...$("foo")]);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpArrSpread = $('foo');
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
const tmpArrSpread = $('foo');
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: ['f', 'o', 'o']
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
