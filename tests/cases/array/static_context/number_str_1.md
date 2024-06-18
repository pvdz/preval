# Preval test case

# number_str_1.md

> Array > Static context > Number str 1
>
> Calling Number on arrays triggers coercion

## Input

`````js filename=intro
$(Number(['1']));
`````

## Pre Normal


`````js filename=intro
$(Number([`1`]));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpStringFirstArg = [`1`];
const tmpCalleeParam = $coerce(tmpStringFirstArg, `number`);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
