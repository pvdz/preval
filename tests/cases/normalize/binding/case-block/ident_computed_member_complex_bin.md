# Preval test case

# ident_computed_member_complex_bin.md

> normalize > assignment > case-block > ident_computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1,
    b = {x: 2},
    c = 3,
    d = 4;
switch ($('a')) {
  case $('a'):
    let a = $(b)[$('x')] = c + d;
    break;
}
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
const tmpSwitchTest = $('a');
{
  let a_1;
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      const tmpBinBothLhs = tmpSwitchTest;
      const tmpBinBothRhs = $('a');
      tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
    }
    if (tmpIfTest) {
      {
        a_1 = undefined;
        const tmpNestedAssignComMemberObj = $(b);
        const tmpNestedAssignComMemberProp = $('x');
        let tmpNestedAssignPropRhs = c + d;
        const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
        tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
        a_1 = tmpNestedPropAssignRhs;
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: { x: '2' }
 - 4: 'x'
 - 5: 1, { x: '7' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
