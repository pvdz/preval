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
null;
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
[null];

Normalized calls: Same

Final output calls: Same
