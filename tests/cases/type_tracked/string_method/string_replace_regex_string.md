# Preval test case

# string_replace_regex_string.md

> Type tracked > String method > String replace regex string
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello   world'.replace(/ /g, '.'));
`````

## Pre Normal


`````js filename=intro
$(`hello   world`.replace(/ /g, `.`));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCallObj = `hello   world`;
const tmpCallVal = tmpCallObj.replace;
const tmpCalleeParam$1 = / /g;
const tmpCalleeParam$3 = `.`;
const tmpCalleeParam = $dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`hello...world`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "hello...world" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'hello...world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
