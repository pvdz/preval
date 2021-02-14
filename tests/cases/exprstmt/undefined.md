# Preval test case

# undefined.md

> exprstmt > undefined
>
> Undefineds as statement can be eliminated

## Input

`````js filename=intro
undefined;
`````

## Normalized

`````js filename=intro
undefined;
`````

## Output

`````js filename=intro
undefined;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
