# Preval test case

# if_one.md

> ifelse > simple > if_one
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (1) ;
`````

## Normalized

`````js filename=intro
1;
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
