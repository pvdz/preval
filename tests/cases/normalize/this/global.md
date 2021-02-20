# Preval test case

# global.md

> Normalize > This > Global
>
> A constant set to null should be eliminated

Note: in strict mode this in global is gonna be bad.

#TODO

## Input

`````js filename=intro
const x = this;
$(x);
`````

## Normalized

`````js filename=intro
const x = this;
$(x);
`````

## Output

`````js filename=intro
$(this);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
