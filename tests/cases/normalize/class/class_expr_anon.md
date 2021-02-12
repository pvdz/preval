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
 - 1: 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
