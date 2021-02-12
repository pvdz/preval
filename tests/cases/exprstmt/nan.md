# Preval test case

# null.md

> exprstmt > null
>
> Nulls as statement can be eliminated

## Input

`````js filename=intro
NaN;
`````

## Normalized

`````js filename=intro
NaN;
`````

## Output

`````js filename=intro
NaN;
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
