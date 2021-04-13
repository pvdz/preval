# Preval test case

# if.md

> Normalize > Blocks > If
>
> Add blocks to sub-statements

## Input

`````js filename=intro
if ($(1)) $(2);
`````

## Pre Normal

`````js filename=intro
if ($(1)) $(2);
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(2);
} else {
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(2);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
