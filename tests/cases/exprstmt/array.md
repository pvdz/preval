# Preval test case

# array.md

> exprstmt > array
>
> Arrays without side-effects as statement can be eliminated

#TODO

## Input

`````js filename=intro
[1,2,3];
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
