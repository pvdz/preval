# Preval test case

# stmt_simple_complex.md

> Logical > And > Stmt simple complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
1 && $(2);
`````

## Normalized

`````js filename=intro
$(2);
`````

## Output

`````js filename=intro
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
