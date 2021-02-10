# Preval test case

# auto_ident_nested_member_complex_simple.md

> normalize > expressions > assignments > stmt_global_block > auto_ident_nested_member_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { x: 1 },
    c = { y: 2 },
    d = 3;

  let a = { a: 999, b: 1000 };
  a = $(b)[$("x")] = $(c)[$("y")] = d;
  $(a, b, c, d);
}
`````

## Normalized

`````js filename=intro
{
  let b = { x: 1 };
  let c = { y: 2 };
  let d = 3;
  let a = { a: 999, b: 1000 };
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
  a = tmpNestedPropAssignRhs$1;
  $(a, b, c, d);
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
 - 5: 3, { x: '3' }, { y: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
