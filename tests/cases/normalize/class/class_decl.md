# Preval test case

# class_decl.md

> normalize > class > class_decl
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
let x = class x {};
$(x);
`````

## Output

`````js filename=intro
let x = class x {};
$(x);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
