# Preval test case

# auto_pattern_obj_complex.md

> normalize > expressions > assignments > stmt_func_top > auto_pattern_obj_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let { a } = { a: 999, b: 1000 };
  ({ a } = $({ a: 1, b: 2 }));
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let bindingPatternObjRoot = { a: 999, b: 1000 };
  let a = bindingPatternObjRoot.a;
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 1, b: 2 };
  const tmpAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
  a = tmpAssignObjPatternRhs.a;
  $(a);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
