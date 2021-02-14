# Preval test case

# infinity.md

> normalize > unary > minus > infinity
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(+Infinity);
`````

## Normalized

`````js filename=intro
$(+Infinity);
`````

## Output

`````js filename=intro
$(+Infinity);
`````

## Result

Should call `$` with:
 - 1: Infinity
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
