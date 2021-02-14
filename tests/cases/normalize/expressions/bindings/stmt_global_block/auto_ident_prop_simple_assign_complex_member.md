# Preval test case

# auto_ident_prop_simple_assign_complex_member.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_prop_simple_assign_complex_member
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { c: 10, d: 20 };

  let a = (b.c = $(b)[$("d")]);
  $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let b = { c: 10, d: 20 };
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  b.c = varInitAssignLhsComputedRhs;
  let a = varInitAssignLhsComputedRhs;
  $(a, b);
}
`````

## Output

`````js filename=intro
{
  let b = { c: 10, d: 20 };
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
  b.c = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs, b);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 20, { c: '20', d: '20' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
