# Preval test case

# class_decl_extends.md

> normalize > class > class_decl_extends
>
> Class decls should become expressions

#TODO

## Input

`````js filename=intro
class x extends y {}
$(x);
`````

## Normalized

`````js filename=intro
let x = class extends y {};
$(x);
`````

## Output

`````js filename=intro
let x = class extends y {};
$(x);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
