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
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      {
        tmpBinBothLhs = $(1);
        tmpBinBothRhs = $(2);
        a = tmpBinBothLhs + tmpBinBothRhs;
        $(a);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpIfTest = 1 === 1;
  }
  if (tmpIfTest) {
    {
      tmpBinBothLhs = $(1);
      tmpBinBothRhs = $(2);
      a = tmpBinBothLhs + tmpBinBothRhs;
      $(a);
    }
    tmpFallthrough = true;
  }
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
