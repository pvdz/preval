# Preval test case

# null.md

> exprstmt > null
>
> Nulls as statement can be eliminated

## Input

`````js filename=intro
Infinity;
`````

## Normalized

`````js filename=intro

`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
