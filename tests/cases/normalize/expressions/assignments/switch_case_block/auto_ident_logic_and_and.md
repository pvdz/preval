# Preval test case

# auto_ident_logic_and_and.md

> normalize > expressions > assignments > switch_case_block > auto_ident_logic_and_and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = $($(1)) && $($(1)) && $($(2));
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
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
        const tmpCallCallee = $;
        const tmpCalleeParam = $(1);
        a = tmpCallCallee(tmpCalleeParam);
        if (a) {
          const tmpCallCallee$1 = $;
          const tmpCalleeParam$1 = $(1);
          a = tmpCallCallee$1(tmpCalleeParam$1);
        }
        if (a) {
          const tmpCallCallee$2 = $;
          const tmpCalleeParam$2 = $(2);
          a = tmpCallCallee$2(tmpCalleeParam$2);
        }
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
$(1);
tmpSwitchBreak: {
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
        const tmpCallCallee = $;
        const tmpCalleeParam = $(1);
        a = tmpCallCallee(tmpCalleeParam);
        if (a) {
          const tmpCallCallee$1 = $;
          const tmpCalleeParam$1 = $(1);
          a = tmpCallCallee$1(tmpCalleeParam$1);
        }
        if (a) {
          const tmpCallCallee$2 = $;
          const tmpCalleeParam$2 = $(2);
          a = tmpCallCallee$2(tmpCalleeParam$2);
        }
      }
    }
    tmpFallthrough = true;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 2
 - 9: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 1
 - eval returned: ('<crash[ <ref> is not defined ]>')
