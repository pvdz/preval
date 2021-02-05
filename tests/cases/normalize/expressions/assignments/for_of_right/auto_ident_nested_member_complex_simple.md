# Preval test case

# auto_ident_nested_member_complex_simple.md

> normalize > expressions > assignments > for_of_right > auto_ident_nested_member_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3;

let a = { a: 999, b: 1000 };
for (let x of (a = $(b)[$("x")] = $(c)[$("y")] = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let a = { a: 999, b: 1000 };
{
  let tmpForOfDeclRhs;
  let tmpNestedComplexRhs;
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $('x');
  let tmpNestedAssignPropRhs;
  const tmpNestedAssignComMemberObj$1 = $(c);
  const tmpNestedAssignComMemberProp$1 = $('y');
  const tmpNestedPropAssignRhs = d;
  tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs;
  tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
  const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$1;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs$1;
  a = tmpNestedComplexRhs;
  tmpForOfDeclRhs = tmpNestedComplexRhs;
  let x;
  for (x of tmpForOfDeclRhs) {
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let a = { a: 999, b: 1000 };
let tmpForOfDeclRhs;
let tmpNestedComplexRhs;
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $('x');
let tmpNestedAssignPropRhs;
const tmpNestedAssignComMemberObj$1 = $(c);
const tmpNestedAssignComMemberProp$1 = $('y');
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = 3;
tmpNestedAssignPropRhs = 3;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$1;
tmpNestedComplexRhs = tmpNestedPropAssignRhs$1;
a = tmpNestedComplexRhs;
tmpForOfDeclRhs = tmpNestedComplexRhs;
let x;
for (x of tmpForOfDeclRhs) {
}
$(a, b, c, 3);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
