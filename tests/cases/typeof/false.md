# Preval test case

# false.md

> Typeof > False
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof false)
`````

## Pre Normal


`````js filename=intro
$(typeof false);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = `boolean`;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`boolean`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "boolean" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'boolean'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
