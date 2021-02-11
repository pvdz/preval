# Preval test case

# auto_ident_prop_complex_assign_complex_member.md

> normalize > expressions > statement > switch_case_top > auto_ident_prop_complex_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    $(b).c = $(b)[$("d")];
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
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
      const tmpAssignMemLhsObj = $(b);
      const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
      const tmpCompObj = $(b);
      const tmpCompProp = $('d');
      const tmpAssignMemRhs = tmpCompObj[tmpCompProp];
      tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
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
 - 4: { c: '10', d: '20' }
 - 5: 'd'
 - 6: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
