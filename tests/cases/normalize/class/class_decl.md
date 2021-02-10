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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
