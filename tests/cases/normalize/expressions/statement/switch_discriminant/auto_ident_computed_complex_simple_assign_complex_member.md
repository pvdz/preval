# Preval test case

# auto_ident_computed_complex_simple_assign_complex_member.md

> normalize > expressions > statement > switch_discriminant > auto_ident_computed_complex_simple_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
switch (($(b)["c"] = $(b)[$("d")])) {
  default:
    $(100);
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
let tmpSwitchTest;
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $('d');
let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj['c'] = tmpNestedPropAssignRhs;
tmpSwitchTest = tmpNestedPropAssignRhs;
{
  let tmpFallthrough = false;
  {
    $(100);
  }
}
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 100
 - 5: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
