# Preval test case

# auto_pattern_obj_simple.md

> normalize > expressions > statement > let > auto_pattern_obj_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let { a, b } = { a: 1, b: 2 };
$(a, b);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 1, b: 2 };
let a = bindingPatternObjRoot.a;
let b = bindingPatternObjRoot.b;
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
