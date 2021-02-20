# Preval test case

# else_zero.md

> Ifelse > Simple > Else zero
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (0) $(1);
else $(2);
`````

## Normalized

`````js filename=intro
$(2);
`````

## Output

`````js filename=intro
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
