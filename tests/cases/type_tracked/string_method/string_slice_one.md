# Preval test case

# string_slice_one.md

> Type tracked > String method > String slice one
>
> String slice should fully resolve

## Input

`````js filename=intro
$('hello   world'.slice(10));
`````

## Pre Normal

`````js filename=intro
$(`hello   world`.slice(10));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `hello   world`.slice(10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`rld`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "rld" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'rld'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
