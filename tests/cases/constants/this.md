# Preval test case

# null.md

> constants > null
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
const x = this;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Maximum call stack size exceeded ]>')

Normalized calls: Same

Final output calls: Same
