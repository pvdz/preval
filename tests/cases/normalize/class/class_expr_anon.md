# Preval test case

# class_expr_anon.md

> normalize > class > class_expr_anon
>
> Class expression base

#TODO

## Input

`````js filename=intro
let a = class {}
$(a);
`````

## Normalized

`````js filename=intro
let a = class {};
$(a);
`````

## Output

`````js filename=intro
let a = class {};
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
