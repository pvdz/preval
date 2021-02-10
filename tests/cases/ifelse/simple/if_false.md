# Preval test case

# if_false.md

> ifelse > simple > if_false
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (false) $();
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
