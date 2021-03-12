# Preval test case

# else_func.md

> Ifelse > Simple > Else func
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (function(){}) $(1);
else $(2);
`````

## Pre Normal

`````js filename=intro
if (function () {}) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
const tmpIfTest = function () {};
if (tmpIfTest) {
  $(1);
} else {
  $(2);
}
`````

## Output

`````js filename=intro
const tmpIfTest = function () {};
if (tmpIfTest) {
  $(1);
} else {
  $(2);
}
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
