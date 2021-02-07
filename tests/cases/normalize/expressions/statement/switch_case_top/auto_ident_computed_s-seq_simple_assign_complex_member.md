# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> normalize > expressions > statement > switch_case_top > auto_ident_computed_s-seq_simple_assign_complex_member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    (1, 2, b)[$("c")] = $(b)[$("d")];
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
    ('case 0:');
    {
      1;
      2;
      const tmpAssignComMemLhsObj = b;
      const tmpAssignComMemLhsProp = $('c');
      const tmpAssignComputedObj = tmpAssignComMemLhsObj;
      const tmpAssignComputedProp = tmpAssignComMemLhsProp;
      const tmpCompObj = $(b);
      const tmpCompProp = $('d');
      const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
      tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
    }
    tmpFallthrough = true;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
$(1);
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
    ('case 0:');
    {
      1;
      2;
      const tmpAssignComMemLhsObj = b;
      const tmpAssignComMemLhsProp = $('c');
      const tmpAssignComputedObj = tmpAssignComMemLhsObj;
      const tmpAssignComputedProp = tmpAssignComMemLhsProp;
      const tmpCompObj = $(b);
      const tmpCompProp = $('d');
      const tmpAssignComputedRhs = tmpCompObj[tmpCompProp];
      tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
    }
    tmpFallthrough = true;
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'c'
 - 4: { c: '10', d: '20' }
 - 5: 'd'
 - 6: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 1
 - eval returned: ('<crash[ <ref> is not defined ]>')
