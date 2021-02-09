# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > case-block > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
switch ($('a')) { case $('a'): let a = $(b).x = c; break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = { x: 2 };
let c = 3;
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
        const tmpNestedAssignObj = $(b);
        const tmpNestedPropAssignRhs = c;
        tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
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
let b = { x: 2 };
$('a');
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
      const tmpNestedAssignObj = $(b);
      const tmpNestedPropAssignRhs = c;
      tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
      a_1 = tmpNestedPropAssignRhs;
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
}
$(1, b, 3);
`````

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: { x: '2' }
 - 4: 1, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 'a'
 - eval returned: ('<crash[ <ref> is not defined ]>')
