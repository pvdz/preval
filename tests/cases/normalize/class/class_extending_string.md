# Preval test case

# class_computed_key_extends.md

> normalize > class > class_computed_key_extends
>
> This broke something at some point in time :)

#TODO

## Input

`````js filename=intro
class x extends $(String) {}
`````

## Normalized

`````js filename=intro
const tmpClassSuper = $(String);
let x = class extends tmpClassSuper {};
`````

## Output

`````js filename=intro
const tmpClassSuper = $(String);
let x = class extends tmpClassSuper {};
`````

## Result

Should call `$` with:
 - 1: 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
