# Preval test case

# string_lastindexof_four.md

> Type tracked > String method > String lastindexof four
>
> String lastIndexOf should fully resolve

## Input

`````js filename=intro
$('hello'.lastIndexOf('e', 4, $, unknown));
`````

## Pre Normal


`````js filename=intro
$(`hello`.lastIndexOf(`e`, 4, $, unknown));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `hello`.lastIndexOf(`e`, 4, $, unknown);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
unknown;
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
unknown;
$( 1 );
`````

## Globals

BAD@! Found 1 implicit global bindings:

unknown

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
