# Preval test case

# null.md

> exprstmt > null
>
> Nulls as statement can be eliminated

## Input

`````js filename=intro
null;
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
