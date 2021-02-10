# Preval test case

# if_zero.md

> ifelse > simple > if_zero
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (0) $();
`````

## Normalized

`````js filename=intro

`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
