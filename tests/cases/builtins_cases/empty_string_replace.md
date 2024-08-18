# Preval test case

# empty_string_replace.md

> Builtins cases > Empty string replace
>
>

## Input

`````js filename=intro
$(''.replace(/^/, String));
`````

## Pre Normal


`````js filename=intro
$(``.replace(/^/, String));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam$1 = /^/;
const tmpCalleeParam$3 = String;
const tmpCalleeParam = ``.replace(tmpCalleeParam$1, tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(``);
`````

## PST Output

With rename=true

`````js filename=intro
$( "" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
