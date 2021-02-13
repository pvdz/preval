# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_opt_c-mem_call_complex_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = $(b)?.[$("$")]?.($(1));
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let b;
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
      b = { $: $ };
      a = undefined;
      tmpChainRootCall = $;
      tmpChainElementCall = tmpChainRootCall(b);
      if (tmpChainElementCall) {
        const tmpChainRootComputed = $('$');
        const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
        if (tmpChainElementObject) {
          const tmpCallObj = tmpChainElementObject;
          const tmpCallVal = tmpCallObj.call;
          const tmpCalleeParam = tmpChainElementCall;
          const tmpCalleeParam$1 = $(1);
          const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
          a = tmpChainElementCall$1;
        }
      }
      $(a);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let b;
  let a;
  let tmpChainRootCall;
  let tmpChainElementCall;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === 1;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      b = { $: $ };
      a = undefined;
      tmpChainRootCall = $;
      tmpChainElementCall = tmpChainRootCall(b);
      if (tmpChainElementCall) {
        const tmpChainRootComputed = $('$');
        const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
        if (tmpChainElementObject) {
          const tmpCallVal = tmpChainElementObject.call;
          const tmpCalleeParam = tmpChainElementCall;
          const tmpCalleeParam$1 = $(1);
          const tmpChainElementCall$1 = tmpCallVal.call(tmpChainElementObject, tmpCalleeParam, tmpCalleeParam$1);
          a = tmpChainElementCall$1;
        }
      }
      $(a);
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
