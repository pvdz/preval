# Preval test case

# if_one.md

> ifelse > simple > if_one
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (1) $();
`````

## Normalized

`````js filename=intro
{
  $();
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
