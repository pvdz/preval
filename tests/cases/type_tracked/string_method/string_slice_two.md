# Preval test case

# string_slice_two.md

> Type tracked > String method > String slice two
>
> String slice should fully resolve

## Input

`````js filename=intro
$('hello   world'.slice(5, 10));
`````

## Pre Normal


`````js filename=intro
$(`hello   world`.slice(5, 10));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `hello   world`.slice(5, 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`   wo`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "   wo" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ' wo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
