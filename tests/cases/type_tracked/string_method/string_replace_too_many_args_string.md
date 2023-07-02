# Preval test case

# string_replace_too_many_args_string.md

> Type tracked > String method > String replace too many args string
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello world'.replace(' ', ', ', $, unknown));
`````

## Pre Normal

`````js filename=intro
$(`hello world`.replace(` `, `, `, $, unknown));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `hello world`.replace(` `, `, `, $, unknown);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
unknown;
$(`hello, world`);
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
