# Preval test case

# auto_ident_computed_complex_complex_assign_complex_member.md

> normalize > expressions > assignments > switch_case_top > auto_ident_computed_complex_complex_assign_complex_member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = $(b)[$("c")] = $(b)[$("d")];
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    const tmpBinBothRhs = $(1);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    {
      const tmpNestedAssignComMemberObj = $(b);
      const tmpNestedAssignComMemberProp = $('c');
      const tmpCompObj = $(b);
      const tmpCompProp = $('d');
      let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
      const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
      tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
      a = tmpNestedPropAssignRhs;
    }
    tmpFallthrough = true;
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
 - 1: 1
 - 2: 1
 - 3: { c: '10', d: '20' }
 - 4: 'c'
 - 5: { c: '10', d: '20' }
 - 6: 'd'
 - 7: 20, { c: '20', d: '20' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
