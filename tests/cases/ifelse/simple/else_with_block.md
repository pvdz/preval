# Preval test case

# else_with_block.md

> Ifelse > Simple > Else with block
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (true) {
  $(1);
} else {
  $(2);
}
`````

## Pre Normal


`````js filename=intro
if (true) {
  $(1);
} else {
  $(2);
}
`````

## Normalized


`````js filename=intro
$(1);
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
