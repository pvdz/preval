# Preval test case

# null.md

> constants > null
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
 - eval returned: ('<crash[ Maximum call stack size exceeded ]>')

Normalized calls: Same

Final output calls: Same
