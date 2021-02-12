# Preval test case

# auto_ident_opt_s-seq.md

> normalize > expressions > bindings > switch_case > auto_ident_opt_s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: 1 };

    let a = (1, 2, b)?.x;
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let a;
  let tmpChainRootProp;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      b = { x: 1 };
      a = undefined;
      tmpChainRootProp = b;
      if (tmpChainRootProp) {
        const tmpChainElementObject = tmpChainRootProp.x;
        a = tmpChainElementObject;
      }
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
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
