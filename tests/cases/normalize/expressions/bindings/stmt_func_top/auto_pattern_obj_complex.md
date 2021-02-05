# Preval test case

# auto_pattern_obj_complex.md

> normalize > expressions > bindings > stmt_func_top > auto_pattern_obj_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let { a } = $({ a: 1, b: 2 });
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 1, b: 2 };
  let bindingPatternObjRoot = tmpCallCallee(tmpCalleeParam);
  let a = bindingPatternObjRoot.a;
  $(a);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f() {
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 1, b: 2 };
  let bindingPatternObjRoot = tmpCallCallee(tmpCalleeParam);
  let a = bindingPatternObjRoot.a;
  $(a);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
