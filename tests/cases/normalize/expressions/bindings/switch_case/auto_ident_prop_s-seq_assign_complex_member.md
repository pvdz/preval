# Preval test case

# auto_ident_prop_s-seq_assign_complex_member.md

> normalize > expressions > bindings > switch_case > auto_ident_prop_s-seq_assign_complex_member
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: 10, d: 20 };

    let a = ((1, 2, b).c = $(b)[$("d")]);
    $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let a;
  {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      {
        b = { c: 10, d: 20 };
        a = undefined;
        const tmpNestedAssignObj = b;
        const tmpCompObj = $(b);
        const tmpCompProp = $('d');
        let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
        const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
        tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
        a = tmpNestedPropAssignRhs;
        $(a, b);
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
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 20, { c: '20', d: '20' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
