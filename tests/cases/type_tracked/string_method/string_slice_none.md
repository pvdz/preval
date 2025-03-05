# Preval test case

# string_slice_none.md

> Type tracked > String method > String slice none
>
> String slice should fully resolve

## Input

`````js filename=intro
$('hello   world'.slice());
`````

## Pre Normal


`````js filename=intro
$(`hello   world`.slice());
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = `hello   world`.slice();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`hello   world`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "hello   world" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'hello world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
