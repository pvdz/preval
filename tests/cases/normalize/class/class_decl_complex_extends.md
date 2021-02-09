# Preval test case

# class_decl_complex_extends.md

> normalize > class > class_decl_complex_extends
>
> Extends should be a simple node

#TODO

## Input

`````js filename=intro
class x extends $(String) {}
$(x);
`````

## Normalized

`````js filename=intro
const tmpClassSuper = $(String);
let x = class x extends tmpClassSuper {};
$(x);
`````

## Output

`````js filename=intro
const tmpClassSuper = $(String);
let x = class x extends tmpClassSuper {};
$(x);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
