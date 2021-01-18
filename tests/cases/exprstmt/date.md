# Preval test case

# undefined.md

> exprstmt > undefined
>
> Date as ident statement can be eliminated

## Input

`````js filename=intro
Date;
`````

## Normalized

`````js filename=intro
Date;
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
[null];

Normalized calls: Same

Final output calls: Same
