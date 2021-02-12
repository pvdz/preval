# Preval test case

# min_undefined.md

> plusmin > min_undefined
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!undefined);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = !undefined;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = !undefined;
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
