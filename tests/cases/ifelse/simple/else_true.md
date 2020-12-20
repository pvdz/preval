# Preval test case

# else_true.md

> ifelse > simple > else_true
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (true) $(1);
else $(2);
`````

## Output

`````js filename=intro
$(1);
`````
