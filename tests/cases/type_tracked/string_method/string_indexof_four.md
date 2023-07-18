# Preval test case

# string_indexof_four.md

> Type tracked > String method > String indexof four
>
> String indexOf should fully resolve

## Input

`````js filename=intro
$('hello'.indexOf('l', 1, $, unknown));
`````

## Pre Normal

`````js filename=intro
$(`hello`.indexOf(`l`, 1, $, unknown));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `hello`.indexOf(`l`, 1, $, unknown);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
unknown;
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
unknown;
$( 2 );
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
