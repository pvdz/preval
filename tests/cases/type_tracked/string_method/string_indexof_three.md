# Preval test case

# string_indexof_three.md

> Type tracked > String method > String indexof three
>
> String indexOf should fully resolve

## Input

`````js filename=intro
$('hello'.indexOf('l', 1, $));
`````

## Pre Normal


`````js filename=intro
$(`hello`.indexOf(`l`, 1, $));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `hello`.indexOf(`l`, 1, $);
tmpCallCallee(tmpCalleeParam);
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
