# Preval test case

# string_array_access_ok.md

> Normalize > Static expressions > Statement > String array access ok
>
> The length property on a string literal can be determined at compile time

#TODO

## Input

`````js filename=intro
$("fop"[1]);
`````

## Pre Normal

`````js filename=intro
$(`fop`[1]);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `o`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`o`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "o" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'o'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
