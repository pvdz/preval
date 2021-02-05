# Preval test case

# auto_ident_nested_member_complex_bin.md

> normalize > expressions > statement > switch_w_default_case_block > auto_ident_nested_member_complex_bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

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
    {
      $(b)[$("x")] = $(c)[$("y")] = d + e;
    }
    break;
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, b, c, d, e);
`````

## Normalized

`````js filename=intro
var tmpDoWhileTest;
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
  let tmpSwitchValue = tmpSwitchTest;
  let tmpSwitchCheckCases = true;
  let tmpSwitchFallthrough = false;
  do {
    if (tmpSwitchCheckCases) {
      ('Cases before the default case');
      {
        ('case 0');
        let tmpIfTest = tmpSwitchFallthrough;
        if (tmpIfTest) {
        } else {
          const tmpBinLhs = $(1);
          tmpIfTest = tmpBinLhs === tmpSwitchValue;
        }
        if (tmpIfTest) {
          {
            {
              const tmpAssignComMemLhsObj = $(b);
              const tmpAssignComMemLhsProp = $('x');
              const tmpAssignComputedObj = tmpAssignComMemLhsObj;
              const tmpAssignComputedProp = tmpAssignComMemLhsProp;
              let tmpAssignComputedRhs;
              const tmpNestedAssignComMemberObj = $(c);
              const tmpNestedAssignComMemberProp = $('y');
              let tmpNestedAssignPropRhs = d + e;
              const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
              tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
              tmpAssignComputedRhs = tmpNestedPropAssignRhs;
              tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
            }
            break;
          }
          tmpSwitchFallthrough = true;
        }
      }
    } else {
      tmpSwitchFallthrough = true;
    }
    if (tmpSwitchFallthrough) {
      ('the default case');
      {
        $('fail1');
      }
      tmpSwitchFallthrough = true;
    }
    {
      {
        ('cases after the default case');
        {
          ('case 0');
          let tmpIfTest$1 = tmpSwitchFallthrough;
          if (tmpIfTest$1) {
          } else {
            tmpIfTest$1 = 2 === tmpSwitchValue;
          }
          if (tmpIfTest$1) {
            {
              $('fail2');
            }
            tmpSwitchFallthrough = true;
          }
        }
      }
    }
    tmpSwitchCheckCases = false;
    tmpDoWhileTest = tmpSwitchFallthrough === false;
  } while (tmpDoWhileTest);
}
$(a, b, c, d, e);
`````

## Output

`````js filename=intro
var tmpDoWhileTest;
let b = { x: 1 };
let c = { y: 2 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCheckCases = true;
let tmpSwitchFallthrough = false;
do {
  if (tmpSwitchCheckCases) {
    let tmpIfTest = tmpSwitchFallthrough;
    if (tmpIfTest) {
    } else {
      const tmpBinLhs = $(1);
      tmpIfTest = tmpBinLhs === tmpSwitchValue;
    }
    if (tmpIfTest) {
      const tmpAssignComMemLhsObj = $(b);
      const tmpAssignComMemLhsProp = $('x');
      const tmpAssignComputedObj = tmpAssignComMemLhsObj;
      const tmpAssignComputedProp = tmpAssignComMemLhsProp;
      let tmpAssignComputedRhs;
      const tmpNestedAssignComMemberObj = $(c);
      const tmpNestedAssignComMemberProp = $('y');
      tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 7;
      tmpAssignComputedRhs = 7;
      tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
      break;
      tmpSwitchFallthrough = true;
    }
  } else {
    tmpSwitchFallthrough = true;
  }
  if (tmpSwitchFallthrough) {
    $('fail1');
    tmpSwitchFallthrough = true;
  }
  let tmpIfTest$1 = tmpSwitchFallthrough;
  if (tmpIfTest$1) {
  } else {
    tmpIfTest$1 = 2 === tmpSwitchValue;
  }
  if (tmpIfTest$1) {
    $('fail2');
    tmpSwitchFallthrough = true;
  }
  tmpSwitchCheckCases = false;
  tmpDoWhileTest = tmpSwitchFallthrough === false;
} while (tmpDoWhileTest);
$(a, b, c, 7, 4);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { x: '1' }
 - 4: 'x'
 - 5: { y: '2' }
 - 6: 'y'
 - 7: { a: '999', b: '1000' }, { x: '7' }, { y: '7' }, 3, 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 1
 - 2: 1
 - 3: { x: '1' }
 - 4: 'x'
 - 5: { y: '2' }
 - 6: 'y'
 - 7: { a: '999', b: '1000' }, { x: '7' }, { y: '7' }, 7, 4
 - eval returned: undefined
