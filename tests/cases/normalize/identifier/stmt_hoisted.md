# Preval test case

# stmt_hoisted.md

> normalize > identifier > stmt_hoisted
>
> Hoisted global statement should be eliminated

#TODO

## Input

`````js filename=intro
x;
var x = 10;
`````

## Normalized

`````js filename=intro
var x;
x = 10;
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
