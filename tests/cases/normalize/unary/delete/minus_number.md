# Preval test case

# minus_number.md

> Normalize > Unary > Delete > Minus number
>
> Silly case that we hopefully never see but :shrug:

## Input

`````js filename=intro
$(delete -1);
`````

## Pre Normal


`````js filename=intro
$(delete -1);
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
