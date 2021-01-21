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
[1, 2, 3];
`````

## Output

`````js filename=intro
[1, 2, 3];
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
