# Preval test case

# number.md

> Normalize > Unary > Delete > Number
>
> Silly case that we hopefully never see but :shrug:

## Input

`````js filename=intro
$(delete 0x5005);
`````

## Pre Normal


`````js filename=intro
$(delete 20485);
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
