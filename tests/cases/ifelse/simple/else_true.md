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

## Normalized

`````js filename=intro
{
  $(1);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
