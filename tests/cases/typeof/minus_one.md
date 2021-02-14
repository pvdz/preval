# Preval test case

# min_zero.md

> plusmin > min_zero
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof -1);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
-1;
const tmpCalleeParam = 'number';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
-1;
$('number');
`````

## Result

Should call `$` with:
 - 1: 'number'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
