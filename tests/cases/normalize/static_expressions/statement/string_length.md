# Preval test case

# string_length.md

> Normalize > Static expressions > Statement > String length
>
> The length property on a string literal can be determined at compile time

## Input

`````js filename=intro
$("foo".length);
`````

## Pre Normal


`````js filename=intro
$(`foo`.length);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 3;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
