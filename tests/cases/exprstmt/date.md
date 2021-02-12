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
Date;
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
