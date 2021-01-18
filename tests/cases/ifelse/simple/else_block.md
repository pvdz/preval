# Preval test case

# else_arr.md

> ifelse > else_arr
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ([]) $(1);
else {}
`````

## Normalized

`````js filename=intro
if ([]) {
  $(1);
}
`````

## Output

`````js filename=intro
$(1);
`````

## Result

Should call `$` with:
[[1], null];

Normalized calls: Same

Final output calls: Same
