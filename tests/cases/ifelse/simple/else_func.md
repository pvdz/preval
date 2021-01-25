# Preval test case

# else_obj.md

> ifelse > simple > else_obj
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (function(){}) $(1);
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

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
