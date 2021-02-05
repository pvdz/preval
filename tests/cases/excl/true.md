# Preval test case

# min_true.md

> plusmin > min_true
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!true);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = !true;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
tmpCallCallee(false);
`````

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
