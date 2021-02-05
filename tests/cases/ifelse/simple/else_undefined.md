# Preval test case

# else_undefined.md

> ifelse > simple > else_undefined
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (undefined) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
if (undefined) {
  $(1);
} else {
  $(2);
}
`````

## Output

`````js filename=intro
$(2);
`````

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
