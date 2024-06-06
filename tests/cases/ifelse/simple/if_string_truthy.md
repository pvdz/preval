# Preval test case

# if_string_truthy.md

> Ifelse > Simple > If string truthy
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ("pass") {
  $();
}
`````

## Pre Normal


`````js filename=intro
if (`pass`) {
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
