# Preval test case

# binary_arg.md

> Normalize > Unary > Delete > Binary arg
>
> Delete on non-property is valid but useless

## Input

`````js filename=intro
$(delete (1 + 1));
`````

## Pre Normal


`````js filename=intro
$(delete (1 + 1));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = true;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
