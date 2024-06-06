# Preval test case

# else_string_truthy.md

> Ifelse > Simple > Else string truthy
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ("pass") {
  $(1);
} else {
  $(2);
}
`````

## Pre Normal


`````js filename=intro
if (`pass`) {
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
