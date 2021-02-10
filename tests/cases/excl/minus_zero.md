# Preval test case

# min_zero.md

> plusmin > min_zero
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!(-0));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = !-0;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
