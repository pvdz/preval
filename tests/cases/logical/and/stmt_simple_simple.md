# Preval test case

# stmt_simple_simple.md

> Logical > And > Stmt simple simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
1 && 2;
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
