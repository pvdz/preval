# Preval test case

# string_split_multi.md

> Type tracked > String method > String split multi
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello world'.split('', $, unknown));
`````

## Pre Normal


`````js filename=intro
$(`hello world`.split(``, $, unknown));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `hello world`.split(``, $, unknown);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
unknown;
const tmpCalleeParam = [`h`, `e`, `l`, `l`, `o`, ` `, `w`, `o`, `r`, `l`, `d`];
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
unknown;
const a = [ "h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d" ];
$( a );
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
