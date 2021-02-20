# Preval test case

# null.md

> Constants > Null
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

## Globals

None

## Result

Should call `$` with:
 - 1: null
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
