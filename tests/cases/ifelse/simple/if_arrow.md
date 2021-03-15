# Preval test case

# if_arrow.md

> Ifelse > Simple > If arrow
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (() => {}) $();
`````

## Pre Normal

`````js filename=intro
if (() => {}) $();
`````

## Normalized

`````js filename=intro
const tmpIfTest = function () {};
if (tmpIfTest) {
  $();
}
`````

## Output

`````js filename=intro
const tmpIfTest = function () {};
if (tmpIfTest) {
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
