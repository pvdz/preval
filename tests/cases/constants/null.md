# Preval test case

# null.md

> constants > null
>
> A constant set to null should be eliminated

#TODO

## Input

`````js filename=intro
const x = null;
$(x);
`````

## Normalized

`````js filename=intro
const x = null;
$(x);
`````

## Output

`````js filename=intro
$(null);
`````

## Result

Should call `$` with:
 - 1: null
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
