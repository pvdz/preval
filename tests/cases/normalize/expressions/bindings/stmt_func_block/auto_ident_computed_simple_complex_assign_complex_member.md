# Preval test case

# auto_ident_computed_simple_complex_assign_complex_member.md

> normalize > expressions > bindings > stmt_func_block > auto_ident_computed_simple_complex_assign_complex_member
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 10, d: 20 };

    let a = (b[$("c")] = $(b)[$("d")]);
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
    let a;
    const tmpNestedAssignComMemberObj = b;
    const tmpNestedAssignComMemberProp = $('c');
    const tmpCompObj = $(b);
    const tmpCompProp = $('d');
    let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 20, { c: '20', d: '20' }
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
