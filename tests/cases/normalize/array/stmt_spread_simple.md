# Preval test case

# stmt_spread_simple.md

> normalize > array > stmt_spread_simple
>
> Array statements should be eliminated

#TODO

## Input

`````js filename=intro
[...[10, 20], 2, ...[30, 40]];
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
