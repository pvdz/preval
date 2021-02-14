# Preval test case

# min_false.md

> plusmin > min_false
>
> Literals with a `!` unary should get inlined

## Input

`````js filename=intro
$(!false)
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = true;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(true);
`````

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
