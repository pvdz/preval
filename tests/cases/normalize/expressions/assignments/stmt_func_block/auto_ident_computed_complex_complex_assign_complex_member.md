# Preval test case

# auto_ident_computed_complex_complex_assign_complex_member.md

> normalize > expressions > assignments > stmt_func_block > auto_ident_computed_complex_complex_assign_complex_member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 10, d: 20 };

    let a = { a: 999, b: 1000 };
    a = $(b)[$("c")] = $(b)[$("d")];
    $(a, b);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let b = { c: 10, d: 20 };
    let a = { a: 999, b: 1000 };
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $('c');
    const tmpCompObj = $(b);
    const tmpCompProp = $('d');
    const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
    a = tmpNestedPropAssignRhs;
    $(a, b);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  {
    let b = { c: 10, d: 20 };
    let a = { a: 999, b: 1000 };
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $('c');
    const tmpCompObj = $(b);
    const tmpCompProp = $('d');
    const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedAssignPropRhs;
    a = tmpNestedAssignPropRhs;
    $(a, b);
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'c'
 - 3: { c: '10', d: '20' }
 - 4: 'd'
 - 5: 20, { c: '20', d: '20' }
 - 6: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
