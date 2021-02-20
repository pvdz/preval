# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Bindings > Export > Auto pattern obj complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let { a } = $({ a: 1, b: 2 });
$(a);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
let bindingPatternObjRoot = tmpCallCallee(tmpCalleeParam);
let a = bindingPatternObjRoot.a;
export { a };
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = { a: 1, b: 2 };
const bindingPatternObjRoot = $(tmpCalleeParam);
const a = bindingPatternObjRoot.a;
export { a };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
