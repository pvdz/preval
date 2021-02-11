# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> normalize > expressions > assignments > switch_case_block > auto_ident_cond_complex_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    a = $(1) ? (40, 50, $(60)) : $($(100));
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
    {
      {
        const tmpIfTest$1 = $(1);
        if (tmpIfTest$1) {
          a = $(60);
        } else {
          const tmpCallCallee = $;
          const tmpCalleeParam = $(100);
          a = tmpCallCallee(tmpCalleeParam);
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 60
 - 5: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
