# Preval test case

# auto_ident_bin.md

> normalize > expressions > bindings > switch_case > auto_ident_bin
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $(1) + $(2);
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let tmpBinBothLhs;
  let tmpBinBothRhs;
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      tmpBinBothLhs = $(1);
      tmpBinBothRhs = $(2);
      a = tmpBinBothLhs + tmpBinBothRhs;
      $(a);
    }
  }
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
