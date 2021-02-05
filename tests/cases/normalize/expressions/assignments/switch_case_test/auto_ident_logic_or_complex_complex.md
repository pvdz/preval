# Preval test case

# auto_ident_logic_or_complex_complex.md

> normalize > expressions > assignments > switch_case_test > auto_ident_logic_or_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = $($(0)) || $($(2))):
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
    let tmpBinBothRhs;
    const tmpCallCallee = $;
    const tmpCalleeParam = $(0);
    let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
    if (tmpNestedComplexRhs) {
    } else {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(2);
      tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
    }
    a = tmpNestedComplexRhs;
    tmpBinBothRhs = tmpNestedComplexRhs;
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
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
  let tmpBinBothRhs;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(2);
    tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
  }
  a = tmpNestedComplexRhs;
  tmpBinBothRhs = tmpNestedComplexRhs;
  tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
}
if (tmpIfTest) {
  tmpFallthrough = true;
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 0
 - 4: 2
 - 5: 2
 - 6: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
