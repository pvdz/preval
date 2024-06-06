# Preval test case

# if_with_block.md

> Ifelse > Simple > If with block
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (true) {
  $();
}
`````

## Pre Normal


`````js filename=intro
if (true) {
  $();
}
`````

## Normalized


`````js filename=intro
$();
`````

## Output


`````js filename=intro
$();
`````

## PST Output

With rename=true

`````js filename=intro
$();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
