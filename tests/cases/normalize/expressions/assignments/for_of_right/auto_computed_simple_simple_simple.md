# Preval test case

# auto_computed_simple_simple_simple.md

> normalize > expressions > assignments > for_of_right > auto_computed_simple_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = { b: $(1) }));
a["b"] = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs;
  const tmpObjLitVal = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal };
  a = tmpNestedComplexRhs;
  tmpForOfDeclRhs = tmpNestedComplexRhs;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
a['b'] = 2;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpForOfDeclRhs;
const tmpObjLitVal = $(1);
const tmpNestedComplexRhs = { b: tmpObjLitVal };
a = tmpNestedComplexRhs;
tmpForOfDeclRhs = tmpNestedComplexRhs;
let x;
for (x of tmpForOfDeclRhs) {
}
a.b = 2;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
