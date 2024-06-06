# Preval test case

# string_slice_four.md

> Type tracked > String method > String slice four
>
> String slice should fully resolve

## Input

`````js filename=intro
$('hello   world'.slice(5, 10, $, unknown));
`````

## Pre Normal


`````js filename=intro
$(`hello   world`.slice(5, 10, $, unknown));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `hello   world`.slice(5, 10, $, unknown);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
unknown;
$(`   wo`);
`````

## PST Output

With rename=true

`````js filename=intro
unknown;
$( "   wo" );
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
