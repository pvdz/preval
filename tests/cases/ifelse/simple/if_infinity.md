# Preval test case

# if_infinity.md

> Ifelse > Simple > If infinity
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (Infinity) $();
`````

## Pre Normal

`````js filename=intro
if (Infinity) $();
`````

## Normalized

`````js filename=intro
if (Infinity) {
  $();
}
`````

## Output

`````js filename=intro
if (Infinity) {
  $();
}
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
