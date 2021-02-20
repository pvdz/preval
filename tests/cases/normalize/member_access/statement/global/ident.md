# Preval test case

# ident.md

> Normalize > Member access > Statement > Global > Ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
$.length;
`````

## Normalized

`````js filename=intro
$.length;
`````

## Output

`````js filename=intro
$.length;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
