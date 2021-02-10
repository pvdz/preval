# Preval test case

# class_expr_complex_extends.md

> normalize > class > class_expr_complex_extends
>
> Extends should be a simple node

#TODO

## Input

`````js filename=intro
let a = class x extends $(String) {}
$(a, x);
`````

## Normalized

`````js filename=intro
const tmpClassSuper = $(String);
let a = class x extends tmpClassSuper {};
$(a, x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
