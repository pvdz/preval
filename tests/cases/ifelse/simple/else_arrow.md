# Preval test case

# else_arrow.md

> Ifelse > Simple > Else arrow
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (() => {}) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
const tmpIfTest = () => {};
if (tmpIfTest) {
  $(1);
} else {
  $(2);
}
`````

## Output

`````js filename=intro
const tmpIfTest = () => {};
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

Normalized calls: Same

Final output calls: Same
