# Preval test case

# string_split_string.md

> Type tracked > String method > String split string
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello world'.split('o'));
`````

## Pre Normal


`````js filename=intro
$(`hello world`.split(`o`));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `hello world`.split(`o`);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`hell`, ` w`, `rld`];
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "hell", " w", "rld" ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['hell', ' w', 'rld']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
