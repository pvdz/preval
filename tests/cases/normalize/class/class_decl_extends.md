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
let x = class x extends y {};
$(x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
