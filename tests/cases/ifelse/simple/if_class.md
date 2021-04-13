# Preval test case

# if_class.md

> Ifelse > Simple > If class
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (class{}) $();
`````

## Pre Normal

`````js filename=intro
if (class {}) $();
`````

## Normalized

`````js filename=intro
const tmpIfTest = class {};
if (tmpIfTest) {
  $();
} else {
}
`````

## Output

`````js filename=intro
const tmpIfTest = class {};
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
