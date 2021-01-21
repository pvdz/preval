# Preval test case

# else_obj.md

> ifelse > simple > else_obj
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (NaN) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
if (NaN) {
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
 - 0: 2
 - 1: undefined

Normalized calls: Same

Final output calls: Same
