# Preval test case

# class_decl.md

> Normalize > Class > Class decl
>
> Class decls should become expressions

#TODO

## Input

`````js filename=intro
class x {}
$(x);
`````

## Normalized

`````js filename=intro
let x = class {};
$(x);
`````

## Output

`````js filename=intro
const x = class {};
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
