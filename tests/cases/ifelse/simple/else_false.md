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

## Output

`````js filename=intro
$(2);
`````
