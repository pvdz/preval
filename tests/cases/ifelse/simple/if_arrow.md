# Preval test case

# if_arr.md

> ifelse > simple > if_arr
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (() => {}) $();
`````

## Output

`````js filename=intro
$();
`````
