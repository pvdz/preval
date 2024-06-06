# Preval test case

# string_lastindexof_zero.md

> Type tracked > String method > String lastindexof zero
>
> String lastIndexOf should fully resolve

## Input

`````js filename=intro
$('hello'.lastIndexOf());
`````

## Pre Normal


`````js filename=intro
$(`hello`.lastIndexOf());
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `hello`.lastIndexOf();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(-1);
`````

## PST Output

With rename=true

`````js filename=intro
$( -1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
