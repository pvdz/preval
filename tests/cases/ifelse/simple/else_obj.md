# Preval test case

# else_obj.md

> ifelse > simple > else_obj
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ({}) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
if ({}) {
  $(1);
} else {
  $(2);
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
