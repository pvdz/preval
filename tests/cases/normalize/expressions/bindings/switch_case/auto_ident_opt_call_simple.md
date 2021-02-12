# Preval test case

# auto_ident_opt_call_simple.md

> normalize > expressions > bindings > switch_case > auto_ident_opt_call_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $?.(1);
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let a;
  let tmpChainRootCall;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      a = undefined;
      tmpChainRootCall = $;
      if (tmpChainRootCall) {
        const tmpChainElementCall = tmpChainRootCall(1);
        a = tmpChainElementCall;
      }
      $(a);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let a;
  let tmpChainRootCall;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === 1;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      a = undefined;
      tmpChainRootCall = $;
      if (tmpChainRootCall) {
        const tmpChainElementCall = tmpChainRootCall(1);
        a = tmpChainElementCall;
      }
      $(a);
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
