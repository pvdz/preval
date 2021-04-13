# Preval test case

# else_empty.md

> Ifelse > Simple > Else empty
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ([]) $(1);
else ;
`````

## Pre Normal

`````js filename=intro
if ([]) $(1);
else;
`````

## Normalized

`````js filename=intro
const tmpIfTest = [];
if (tmpIfTest) {
  $(1);
} else {
}
`````

## Output

`````js filename=intro
const tmpIfTest = [];
if (tmpIfTest) {
  $(1);
} else {
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
