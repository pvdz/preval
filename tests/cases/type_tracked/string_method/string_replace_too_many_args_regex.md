# Preval test case

# string_replace_too_many_args_regex.md

> Type tracked > String method > String replace too many args regex
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello world'.replace(/ /g, ', ', $, unknown));
`````

## Pre Normal

`````js filename=intro
$(`hello world`.replace(/ /g, `, `, $, unknown));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCallObj = `hello world`;
const tmpCallVal = tmpCallObj.replace;
const tmpCalleeParam$1 = / /g;
const tmpCalleeParam$3 = `, `;
const tmpCalleeParam$5 = $;
const tmpCalleeParam$7 = unknown;
const tmpCalleeParam = $dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5, tmpCalleeParam$7);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
unknown;
$(`hello, world`);
`````

## PST Output

With rename=true

`````js filename=intro
unknown;
$( "hello, world" );
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
