# Preval test case

# auto_pattern_obj_complex.md

> normalize > expressions > statement > computed_prop_obj > auto_pattern_obj_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
let obj = {};
$({ a: 1, b: 2 })["a"];
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let obj = {};
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpCompObj = tmpCallCallee(tmpCalleeParam);
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let obj = {};
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpCompObj = tmpCallCallee(tmpCalleeParam);
tmpCompObj.a;
$(a);
`````

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 999
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
