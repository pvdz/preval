# Preval test case

# class_expr_named.md

> normalize > class > class_expr_named
>
> Class expression base

#TODO

## Input

`````js filename=intro
let a = class x {}
$(a, x);
`````

## Normalized

`````js filename=intro
let a = class x {};
$(a, x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
