# Preval test case

# auto_pattern_obj_complex.md

> normalize > expressions > bindings > stmt_global_block > auto_pattern_obj_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let { a } = $({ a: 1, b: 2 });
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 1, b: 2 };
  let bindingPatternObjRoot = tmpCallCallee(tmpCalleeParam);
  let a = bindingPatternObjRoot.a;
  $(a);
}
`````

## Output

`````js filename=intro
{
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 1, b: 2 };
  let bindingPatternObjRoot = tmpCallCallee(tmpCalleeParam);
  let a = bindingPatternObjRoot.a;
  $(a);
}
`````

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
