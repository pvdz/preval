# Preval test case

# auto_ident_bin.md

> normalize > expressions > assignments > switch_default > auto_ident_bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = $(1) + $(2);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    const tmpBinBothLhs = $(1);
    const tmpBinBothRhs = $(2);
    a = tmpBinBothLhs + tmpBinBothRhs;
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
  {
    const tmpBinBothLhs = $(1);
    const tmpBinBothRhs = $(2);
    a = tmpBinBothLhs + tmpBinBothRhs;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
