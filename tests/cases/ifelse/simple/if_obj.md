# Preval test case

# if_obj.md

> Ifelse > Simple > If obj
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ({}) $();
`````

## Pre Normal

`````js filename=intro
if ({}) $();
`````

## Normalized

`````js filename=intro
const tmpIfTest = {};
if (tmpIfTest) {
  $();
} else {
}
`````

## Output

`````js filename=intro
const tmpIfTest = {};
if (tmpIfTest) {
  $();
} else {
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
