# Preval test case

# regression.md

> Normalize > Logical > Regression
>
> This particular case was breaking

#TODO

## Input

`````js filename=intro
if (false || $(2)) {
  {}
}
`````

## Pre Normal

`````js filename=intro
if (false || $(2)) {
  {
  }
}
`````

## Normalized

`````js filename=intro
let tmpIfTest = false;
if (tmpIfTest) {
} else {
  tmpIfTest = $(2);
}
`````

## Output

`````js filename=intro
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
