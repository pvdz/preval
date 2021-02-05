# Preval test case

# else_obj.md

> ifelse > simple > else_obj
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (class{}) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
const tmpIfTest = class {};
if (tmpIfTest) {
  $(1);
} else {
  $(2);
}
`````

## Output

`````js filename=intro
const tmpIfTest = class {};
if (tmpIfTest) {
  $(1);
} else {
  $(2);
}
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
