# Preval test case

# else_false.md

> ifelse > simple > else_false
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (false) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
if (false) {
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
