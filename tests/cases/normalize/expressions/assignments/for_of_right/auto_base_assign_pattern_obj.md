# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > assignments > for_of_right > auto_base_assign_pattern_obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
for (let x of (a = { b } = $({ b: $(2) })));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
{
  const tmpCallCallee = $;
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
  b = tmpNestedAssignObjPatternRhs.b;
  a = tmpNestedAssignObjPatternRhs;
  let tmpForOfDeclRhs = a;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
{
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
  b = tmpNestedAssignObjPatternRhs.b;
  a = tmpNestedAssignObjPatternRhs;
  let tmpForOfDeclRhs = a;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same