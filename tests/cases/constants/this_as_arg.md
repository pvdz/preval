# Preval test case

# this_as_arg.md

> Constants > This as arg
>
> A constant set to null should be eliminated

Note: in strict mode this in global is gonna be bad.

#TODO

## Input

`````js filename=intro
$(this);
`````

## Normalized

`````js filename=intro
$(this);
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
