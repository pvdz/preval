# Preval test case

# auto_ident_nested_member_complex_bin.md

> normalize > expressions > assignments > logic_and_both > auto_ident_nested_member_complex_bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
$(
  (a = $(b)[$("x")] = $(c)[$("y")] = d + e) &&
    (a = $(b)[$("x")] = $(c)[$("y")] = d + e)
);
$(a, b, c, d, e);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs;
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $('x');
let tmpNestedAssignPropRhs;
const tmpNestedAssignComMemberObj$1 = $(c);
const tmpNestedAssignComMemberProp$1 = $('y');
let tmpNestedAssignPropRhs$1 = d + e;
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs;
tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$1;
tmpNestedComplexRhs = tmpNestedPropAssignRhs$1;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs$1;
  const tmpNestedAssignComMemberObj$2 = $(b);
  const tmpNestedAssignComMemberProp$2 = $('x');
  let tmpNestedAssignPropRhs$2;
  const tmpNestedAssignComMemberObj$3 = $(c);
  const tmpNestedAssignComMemberProp$3 = $('y');
  let tmpNestedAssignPropRhs$3 = d + e;
  const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$3;
  tmpNestedAssignComMemberObj$3[tmpNestedAssignComMemberProp$3] = tmpNestedPropAssignRhs$2;
  tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$2;
  const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$2;
  tmpNestedAssignComMemberObj$2[tmpNestedAssignComMemberProp$2] = tmpNestedPropAssignRhs$3;
  tmpNestedComplexRhs$1 = tmpNestedPropAssignRhs$3;
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a, b, c, d, e);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs;
const tmpNestedAssignComMemberObj = $(b);
const tmpNestedAssignComMemberProp = $('x');
let tmpNestedAssignPropRhs;
const tmpNestedAssignComMemberObj$1 = $(c);
const tmpNestedAssignComMemberProp$1 = $('y');
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = 11;
tmpNestedAssignPropRhs = 11;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$1;
tmpNestedComplexRhs = tmpNestedPropAssignRhs$1;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs$1;
  const tmpNestedAssignComMemberObj$2 = $(b);
  const tmpNestedAssignComMemberProp$2 = $('x');
  let tmpNestedAssignPropRhs$2;
  const tmpNestedAssignComMemberObj$3 = $(c);
  const tmpNestedAssignComMemberProp$3 = $('y');
  tmpNestedAssignComMemberObj$3[tmpNestedAssignComMemberProp$3] = 11;
  tmpNestedAssignPropRhs$2 = 11;
  const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$2;
  tmpNestedAssignComMemberObj$2[tmpNestedAssignComMemberProp$2] = tmpNestedPropAssignRhs$3;
  tmpNestedComplexRhs$1 = tmpNestedPropAssignRhs$3;
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a, b, c, 11, 4);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: { x: '7' }
 - 6: 'x'
 - 7: { y: '7' }
 - 8: 'y'
 - 9: 7
 - 10: 7, { x: '7' }, { y: '7' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: { x: '11' }
 - 6: 'x'
 - 7: { y: '11' }
 - 8: 'y'
 - 9: 11
 - 10: 11, { x: '11' }, { y: '11' }, 11, 4
 - eval returned: undefined
