# Preval test case

# null.md

> Exprstmt > Null
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

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
