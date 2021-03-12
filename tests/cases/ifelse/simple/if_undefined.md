# Preval test case

# if_undefined.md

> Ifelse > Simple > If undefined
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (undefined) $();
`````

## Pre Normal

`````js filename=intro
if (undefined) $();
`````

## Normalized

`````js filename=intro
if (undefined) {
  $();
}
`````

## Output

`````js filename=intro
if (undefined) {
  $();
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
