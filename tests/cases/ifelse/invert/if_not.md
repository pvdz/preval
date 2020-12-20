# Preval test case

# if_not.md

> ifelse > invert > if_not
>
> Invert the logic

#TODO

## Input

`````js filename=intro
if (!$(1)) $(2);
`````

## Output

`````js filename=intro
if ($(1));
else $(2);
`````
