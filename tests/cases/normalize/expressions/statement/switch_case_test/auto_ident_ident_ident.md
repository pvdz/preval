# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > statement > switch_case_test > auto_ident_ident_ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (b = 2):
}
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    let tmpBinBothRhs;
    b = 2;
    tmpBinBothRhs = 2;
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
    }
    tmpFallthrough = true;
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  const tmpBinBothLhs = tmpSwitchTest;
  let tmpBinBothRhs;
  b = 2;
  tmpBinBothRhs = 2;
  tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
}
if (tmpIfTest) {
  tmpFallthrough = true;
}
$(a, b, 2);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
