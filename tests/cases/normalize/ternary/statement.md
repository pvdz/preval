# Preval test case

# statement.md

> normalize > ternary > statement
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
var a;
var b;
var c;
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
