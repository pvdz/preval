# Preval test case

# else_zero.md

> ifelse > simple > else_zero
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (0) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
if (0) {
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
