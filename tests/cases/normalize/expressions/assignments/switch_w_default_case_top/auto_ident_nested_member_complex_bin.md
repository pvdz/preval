# Preval test case

# auto_ident_nested_member_complex_bin.md

> normalize > expressions > assignments > switch_w_default_case_top > auto_ident_nested_member_complex_bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = $(b)[$("x")] = $(c)[$("y")] = d + e;
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b, c, d, e);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
{
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    const tmpNestedAssignComMemberObj = $(b);
    const tmpNestedAssignComMemberProp = $('x');
    let tmpNestedAssignPropRhs;
    const tmpNestedAssignComMemberObj$1 = $(c);
    const tmpNestedAssignComMemberProp$1 = $('y');
    let tmpNestedAssignPropRhs$1 = d + e;
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$1;
    tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs;
    tmpNestedAssignPropRhs = tmpNestedPropAssignRhs;
    const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs;
    tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$1;
    a = tmpNestedPropAssignRhs$1;
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$3) {
    $('fail1');
  }
  const tmpIfTest$4 = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$4) {
    $('fail2');
  }
}
$(a, b, c, d, e);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { x: '1' }
 - 4: 'x'
 - 5: { y: '2' }
 - 6: 'y'
 - 7: 'fail1'
 - 8: 'fail2'
 - 9: 7, { x: '7' }, { y: '7' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
