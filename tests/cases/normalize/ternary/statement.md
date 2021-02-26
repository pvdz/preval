# Preval test case

# statement.md

> Normalize > Ternary > Statement
>
> A statement that is a ternary should be an if-else

#TODO

## Input

`````js filename=intro
var a, b, c;
a ? b : c;
`````

## Normalized

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
