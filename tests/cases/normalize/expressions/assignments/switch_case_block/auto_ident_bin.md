# Preval test case

# auto_ident_bin.md

> normalize > expressions > assignments > switch_case_block > auto_ident_bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = $(1) + $(2);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
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
      {
        const tmpBinBothLhs$1 = $(1);
        const tmpBinBothRhs$1 = $(2);
        a = tmpBinBothLhs$1 + tmpBinBothRhs$1;
      }
    }
    tmpFallthrough = true;
  }
}
$(a);
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
  const tmpBinBothLhs$1 = $(1);
  const tmpBinBothRhs$1 = $(2);
  a = tmpBinBothLhs$1 + tmpBinBothRhs$1;
  tmpFallthrough = true;
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 2
 - 5: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
