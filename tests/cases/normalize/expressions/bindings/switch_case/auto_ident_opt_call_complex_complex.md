# Preval test case

# auto_ident_opt_call_complex_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_opt_call_complex_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($)?.($(1));
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let a;
  let tmpChainRootCall;
  let tmpChainElementCall;
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
      tmpChainElementCall = tmpChainRootCall($);
      const tmpIfTest$2 = tmpChainElementCall != null;
      if (tmpIfTest$2) {
        const tmpCallObj = tmpChainElementCall;
        const tmpCallVal = tmpCallObj.call;
        const tmpCalleeParam = tmpChainRootCall;
        const tmpCalleeParam$1 = $(1);
        const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
        a = tmpChainElementCall$1;
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
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === 1;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      a = undefined;
      const tmpChainRootCall = $;
      const tmpChainElementCall = tmpChainRootCall($);
      const tmpIfTest$2 = tmpChainElementCall != null;
      if (tmpIfTest$2) {
        const tmpCallObj = tmpChainElementCall;
        const tmpCallVal = tmpCallObj.call;
        const tmpCalleeParam = tmpChainRootCall;
        const tmpCalleeParam$1 = $(1);
        const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
        a = tmpChainElementCall$1;
      }
      $(a);
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
