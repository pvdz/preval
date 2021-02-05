# Preval test case

# auto_ident_ident.md

> normalize > expressions > statement > switch_case_top > auto_ident_ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    b;
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
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
    ('case 0:');
    {
      b;
    }
    tmpFallthrough = true;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  const tmpBinBothLhs = tmpSwitchTest;
  const tmpBinBothRhs = $(1);
  tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
}
if (tmpIfTest) {
  tmpFallthrough = true;
}
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
