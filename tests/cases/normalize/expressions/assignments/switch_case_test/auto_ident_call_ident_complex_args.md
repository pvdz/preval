# Preval test case

# auto_ident_call_ident_complex_args.md

> normalize > expressions > assignments > switch_case_test > auto_ident_call_ident_complex_args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = $($(1), $(2))):
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
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
    const tmpCalleeParam = $(1);
    const tmpCalleeParam$1 = $(2);
    const tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
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
({ $: $ });
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  const tmpBinBothLhs = tmpSwitchTest;
  let tmpBinBothRhs;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  const tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
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
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
