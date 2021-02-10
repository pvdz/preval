# Preval test case

# min_zero.md

> plusmin > min_zero
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!(-1));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = !-1;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
