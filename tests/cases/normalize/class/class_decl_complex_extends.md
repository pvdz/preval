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
let x = class extends tmpClassSuper {};
$(x);
`````

## Output

`````js filename=intro
const tmpClassSuper = $(String);
const x = class extends tmpClassSuper {};
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function'
 - 2: 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
