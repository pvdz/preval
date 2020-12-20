# Preval test case

# else_not.md

> ifelse > invert > else_not
>
> Invert the logic

#TODO

## Input

`````js filename=intro
if (!$(1)) $(2);
else $(3);
`````

## Output

`````js filename=intro
if ($(1)) $(3);
else $(2);
`````
