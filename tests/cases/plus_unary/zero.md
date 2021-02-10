# Preval test case

# plus_zero.md

> plusmin > plus_zero
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+0);
`````

## Normalized

`````js filename=intro
$(+0);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
