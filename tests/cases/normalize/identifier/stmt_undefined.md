# Preval test case

# stmt_builtin.md

> normalize > identifier > stmt_builtin
>
> Builtin global statement should be eliminated

#TODO

## Input

`````js filename=intro
undefined;
`````

## Normalized

`````js filename=intro

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
