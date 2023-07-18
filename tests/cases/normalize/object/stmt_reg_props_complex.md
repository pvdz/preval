# Preval test case

# stmt_reg_props_complex.md

> Normalize > Object > Stmt reg props complex
>
> Objects as statement should be eliminated

#TODO

## Input

`````js filename=intro
({x: $(1), y: $(2)});
`````

## Pre Normal

`````js filename=intro
({ x: $(1), y: $(2) });
`````

## Normalized

`````js filename=intro
$(1);
$(2);
`````

## Output

`````js filename=intro
$(1);
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
