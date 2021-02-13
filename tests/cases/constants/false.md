# Preval test case

# null.md

> constants > null
>
> A constant set to false should be eliminated

#TODO

## Input

`````js filename=intro
const x = false;
$(x);
`````

## Normalized

`````js filename=intro
const x = false;
$(x);
`````

## Output

`````js filename=intro
$(false);
`````

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
