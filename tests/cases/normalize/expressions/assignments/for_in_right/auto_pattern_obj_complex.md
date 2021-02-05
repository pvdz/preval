# Preval test case

# auto_pattern_obj_complex.md

> normalize > expressions > assignments > for_in_right > auto_pattern_obj_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
for (let x in ({ a } = $({ a: 1, b: 2 })));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
{
  let tmpForInDeclRhs;
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
  a = tmpNestedAssignObjPatternRhs.a;
  tmpForInDeclRhs = tmpNestedAssignObjPatternRhs;
  let x;
  for (x in tmpForInDeclRhs) {
  }
}
$(a);
`````

## Output

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
let tmpForInDeclRhs;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
a = tmpNestedAssignObjPatternRhs.a;
tmpForInDeclRhs = tmpNestedAssignObjPatternRhs;
let x;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
