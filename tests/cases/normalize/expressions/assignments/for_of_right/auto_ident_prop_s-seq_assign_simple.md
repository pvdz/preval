# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> normalize > expressions > assignments > for_of_right > auto_ident_prop_s-seq_assign_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (let x of (a = (1, 2, b).c = 2));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs;
  let tmpNestedComplexRhs;
  1;
  2;
  const tmpNestedAssignObj = b;
  const tmpNestedPropAssignRhs = 2;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  a = tmpNestedComplexRhs;
  tmpForOfDeclRhs = tmpNestedComplexRhs;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpForOfDeclRhs;
let tmpNestedComplexRhs;
const tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 2;
tmpNestedComplexRhs = 2;
a = tmpNestedComplexRhs;
tmpForOfDeclRhs = tmpNestedComplexRhs;
let x;
for (x of tmpForOfDeclRhs) {
}
$(a, b);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
