# Preval test case

# ident_ident_bin.md

> normalize > assignment > case-block > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
switch ($('a')) { case $('a'): let a = b = c + d; break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
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
      ('case 0:');
      {
        a_1 = undefined;
        const tmpNestedComplexRhs = c + d;
        b = tmpNestedComplexRhs;
        a_1 = tmpNestedComplexRhs;
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
    ('case 0:');
    {
      a_1 = undefined;
      const tmpNestedComplexRhs = c + d;
      b = tmpNestedComplexRhs;
      a_1 = tmpNestedComplexRhs;
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
}
$(1, 2, 3);
`````

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1, 7, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 'a'
 - eval returned: ('<crash[ <ref> is not defined ]>')
