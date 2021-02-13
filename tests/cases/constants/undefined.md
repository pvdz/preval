# Preval test case

# null.md

> constants > null
>
> A constant set to undefined should be eliminated

#TODO

## Input

`````js filename=intro
const x = undefined;
$(x);
`````

## Normalized

`````js filename=intro
const x = undefined;
$(x);
`````

## Output

`````js filename=intro
$(undefined);
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
