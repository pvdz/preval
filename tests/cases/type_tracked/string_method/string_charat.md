# Preval test case

# string_charat.md

> Type tracked > String method > String charat
>
> String charAt should fully resolve

## Input

`````js filename=intro
$('hello'.charAt(2));
`````

## Pre Normal


`````js filename=intro
$(`hello`.charAt(2));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `hello`.charAt(2);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`l`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "l" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'l'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
