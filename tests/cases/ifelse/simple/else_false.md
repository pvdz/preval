# Preval test case

# else_false.md

> Ifelse > Simple > Else false
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (false) $(1);
else $(2);
`````

## Pre Normal


`````js filename=intro
if (false) $(1);
else $(2);
`````

## Normalized


`````js filename=intro
$(2);
`````

## Output


`````js filename=intro
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
