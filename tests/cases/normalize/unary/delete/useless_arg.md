# Preval test case

# useless_arg.md

> Normalize > Unary > Delete > Useless arg
>
> Delete on non-property is valid but useless

## Input

`````js filename=intro
$(delete $(1));
`````

## Pre Normal


`````js filename=intro
$(delete $(1));
`````

## Normalized


`````js filename=intro
$(1);
const tmpCalleeParam = true;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
