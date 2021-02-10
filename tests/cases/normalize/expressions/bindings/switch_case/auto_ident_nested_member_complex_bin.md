# Preval test case

# auto_ident_nested_member_complex_bin.md

> normalize > expressions > bindings > switch_case > auto_ident_nested_member_complex_bin
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 },
      c = { y: 2 },
      d = 3,
      e = 4;

    let a = ($(b)[$("x")] = $(c)[$("y")] = d + e);
    $(a, b, c, d, e);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let c;
  let d;
  let e;
  let a;
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      {
        b = { x: 1 };
        c = { y: 2 };
        d = 3;
        e = 4;
        a = undefined;
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
        a = tmpNestedPropAssignRhs$1;
        $(a, b, c, d, e);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: 7, { x: '7' }, { y: '7' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
