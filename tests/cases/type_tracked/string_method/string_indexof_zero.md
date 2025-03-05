# Preval test case

# string_indexof_zero.md

> Type tracked > String method > String indexof zero
>
> String indexOf should fully resolve

## Input

`````js filename=intro
$('hello'.indexOf());
`````

## Pre Normal


`````js filename=intro
$(`hello`.indexOf());
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = `hello`.indexOf();
$(tmpCalleeParam);
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
