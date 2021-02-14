# Preval test case

# one.md

> normalize > unary > minus > one
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(+1);
`````

## Normalized

`````js filename=intro
$(+1);
`````

## Output

`````js filename=intro
$(+1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
