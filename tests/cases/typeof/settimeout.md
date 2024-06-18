# Preval test case

# settimeout.md

> Typeof > Settimeout
>
> Known builtins

## Input

`````js filename=intro
$(typeof setTimeout)
`````

## Pre Normal


`````js filename=intro
$(typeof setTimeout);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `function`;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`function`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "function" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
