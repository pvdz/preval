# Preval test case

# string_indexof_one.md

> Type tracked > String method > String indexof one
>
> String indexOf should fully resolve

## Input

`````js filename=intro
$('hello'.indexOf('l'));
`````

## Pre Normal


`````js filename=intro
$(`hello`.indexOf(`l`));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = `hello`.indexOf(`l`);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
