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
{
  let ifTestTmp = class {};
  if (ifTestTmp) {
    $(1);
  } else {
    $(2);
  }
}
`````

## Output

`````js filename=intro
let ifTestTmp = class {};
if (ifTestTmp) {
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
