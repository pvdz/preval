# Preval test case

# auto_ident_unary_complex.md

> normalize > expressions > assignments > switch_case_block > auto_ident_unary_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = typeof $(x);
  }
}
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
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
        const tmpUnaryArg = $(x);
        a = typeof tmpUnaryArg;
      }
    }
    tmpFallthrough = true;
  }
}
$(a, x);
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
  const tmpUnaryArg = $(1);
  a = typeof tmpUnaryArg;
  tmpFallthrough = true;
}
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
