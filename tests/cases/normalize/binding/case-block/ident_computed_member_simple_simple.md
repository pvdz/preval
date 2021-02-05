# Preval test case

# ident_computed_member_simple_simple.md

> normalize > assignment > case-block > ident_computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
switch ($('a')) { case $('a'): let a = b[$('x')] = c; break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
const tmpSwitchTest = $('a');
{
  let a;
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
      ('case 0:');
      {
        const tmpNestedAssignComMemberObj = b;
        const tmpNestedAssignComMemberProp = $('x');
        const tmpNestedPropAssignRhs = c;
        tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
        a = tmpNestedPropAssignRhs;
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
let a = 1;
let b = { x: 2 };
$('a');
let a;
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
    ('case 0:');
    {
      const tmpNestedAssignComMemberObj = b;
      const tmpNestedAssignComMemberProp = $('x');
      const tmpNestedPropAssignRhs = c;
      tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
      a = tmpNestedPropAssignRhs;
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
}
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'x'
 - 4: 1, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: ("<crash[ Identifier 'a' has already been declared ]>")
