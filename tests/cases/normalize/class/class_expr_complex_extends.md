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
const tmpClassSuper = $(String);
let a = class x extends tmpClassSuper {};
$(a, x);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: 'function'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
