# Preval test case

# string_split_regex.md

> Type tracked > String method > String split regex
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello world'.split(/o/g));
`````

## Pre Normal


`````js filename=intro
$(`hello world`.split(/o/g));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCallObj = `hello world`;
const tmpCallVal = tmpCallObj.split;
const tmpCalleeParam$1 = /o/g;
const tmpCalleeParam = $dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam = [`hell`, ` w`, `rld`];
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
