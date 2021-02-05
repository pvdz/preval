# Preval test case

# auto_ident_nested_complex_member_assigns.md

> normalize > expressions > bindings > switch_case > auto_ident_nested_complex_member_assigns
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 },
      c = 3;

    let a = ($(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[$("x")] = $(b)[
      $("x")
    ] = $(b)[$("x")] = c);
    $(a, b, c);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let c;
  let a;
  {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      ('case 0:');
      {
        b = { x: 1 };
        c = 3;
        const tmpNestedAssignComMemberObj = $(b);
        const tmpNestedAssignComMemberProp = $('x');
        let tmpNestedAssignPropRhs;
        const tmpNestedAssignComMemberObj$1 = $(b);
        const tmpNestedAssignComMemberProp$1 = $('x');
        let tmpNestedAssignPropRhs$1;
        const tmpNestedAssignComMemberObj$2 = $(b);
        const tmpNestedAssignComMemberProp$2 = $('x');
        let tmpNestedAssignPropRhs$2;
        const tmpNestedAssignComMemberObj$3 = $(b);
        const tmpNestedAssignComMemberProp$3 = $('x');
        let tmpNestedAssignPropRhs$3;
        const tmpNestedAssignComMemberObj$4 = $(b);
        const tmpNestedAssignComMemberProp$4 = $('x');
        let tmpNestedAssignPropRhs$4;
        const tmpNestedAssignComMemberObj$5 = $(b);
        const tmpNestedAssignComMemberProp$5 = $('x');
        const tmpNestedPropAssignRhs = c;
        tmpNestedAssignComMemberObj$5[tmpNestedAssignComMemberProp$5] = tmpNestedPropAssignRhs;
        tmpNestedAssignPropRhs$4 = tmpNestedPropAssignRhs;
        const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$4;
        tmpNestedAssignComMemberObj$4[tmpNestedAssignComMemberProp$4] = tmpNestedPropAssignRhs$1;
        tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs$1;
        const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$3;
        tmpNestedAssignComMemberObj$3[tmpNestedAssignComMemberProp$3] = tmpNestedPropAssignRhs$2;
        tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$2;
        const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$2;
        tmpNestedAssignComMemberObj$2[tmpNestedAssignComMemberProp$2] = tmpNestedPropAssignRhs$3;
        tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$3;
        const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs$1;
        tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$4;
        tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$4;
        const tmpNestedPropAssignRhs$5 = tmpNestedAssignPropRhs;
        tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$5;
        a = tmpNestedPropAssignRhs$5;
        $(a, b, c);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
let b;
let c;
let a;
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  tmpIfTest = true;
}
if (tmpIfTest) {
  b = { x: 1 };
  c = 3;
  const tmpNestedAssignComMemberObj = $(b);
  const tmpNestedAssignComMemberProp = $('x');
  let tmpNestedAssignPropRhs;
  const tmpNestedAssignComMemberObj$1 = $(b);
  const tmpNestedAssignComMemberProp$1 = $('x');
  let tmpNestedAssignPropRhs$1;
  const tmpNestedAssignComMemberObj$2 = $(b);
  const tmpNestedAssignComMemberProp$2 = $('x');
  let tmpNestedAssignPropRhs$2;
  const tmpNestedAssignComMemberObj$3 = $(b);
  const tmpNestedAssignComMemberProp$3 = $('x');
  let tmpNestedAssignPropRhs$3;
  const tmpNestedAssignComMemberObj$4 = $(b);
  const tmpNestedAssignComMemberProp$4 = $('x');
  let tmpNestedAssignPropRhs$4;
  const tmpNestedAssignComMemberObj$5 = $(b);
  const tmpNestedAssignComMemberProp$5 = $('x');
  const tmpNestedPropAssignRhs = c;
  tmpNestedAssignComMemberObj$5[tmpNestedAssignComMemberProp$5] = tmpNestedPropAssignRhs;
  tmpNestedAssignPropRhs$4 = tmpNestedPropAssignRhs;
  const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$4;
  tmpNestedAssignComMemberObj$4[tmpNestedAssignComMemberProp$4] = tmpNestedPropAssignRhs$1;
  tmpNestedAssignPropRhs$3 = tmpNestedPropAssignRhs$1;
  const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$3;
  tmpNestedAssignComMemberObj$3[tmpNestedAssignComMemberProp$3] = tmpNestedPropAssignRhs$2;
  tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs$2;
  const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs$2;
  tmpNestedAssignComMemberObj$2[tmpNestedAssignComMemberProp$2] = tmpNestedPropAssignRhs$3;
  tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$3;
  const tmpNestedPropAssignRhs$4 = tmpNestedAssignPropRhs$1;
  tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$4;
  tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$4;
  const tmpNestedPropAssignRhs$5 = tmpNestedAssignPropRhs;
  tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$5;
  a = tmpNestedPropAssignRhs$5;
  $(a, b, c);
  tmpFallthrough = true;
}
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { x: '1' }
 - 4: 'x'
 - 5: { x: '1' }
 - 6: 'x'
 - 7: { x: '1' }
 - 8: 'x'
 - 9: { x: '1' }
 - 10: 'x'
 - 11: { x: '1' }
 - 12: 'x'
 - 13: 3, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
