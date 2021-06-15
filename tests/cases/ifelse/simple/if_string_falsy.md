# Preval test case

# if_string_falsy.md

> Ifelse > Simple > If string falsy
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ("") {
  $();
}
`````

## Pre Normal

`````js filename=intro
if (``) {
  $();
}
`````

## Normalized

`````js filename=intro

`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
