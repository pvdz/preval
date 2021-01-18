# Preval test case

# else_null.md

> ifelse > simple > else_null
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (null) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
if (null) {
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
[[2], null];

Normalized calls: Same

Final output calls: Same
