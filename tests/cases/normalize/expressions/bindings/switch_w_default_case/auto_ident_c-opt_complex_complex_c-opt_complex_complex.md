# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_c-opt_complex_complex_c-opt_complex_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: { y: 1 } };

    let a = $(b)?.[$("x")]?.[$("y")];
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Normalized

`````js filename=intro
{
  let tmpObjLitVal;
  let b;
  let a;
  let tmpChainRootCall;
  let tmpChainElementCall;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpIfTest$1 = 2 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 2;
    }
  }
  {
    const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$2) {
      tmpObjLitVal = { y: 1 };
      b = { x: tmpObjLitVal };
      a = undefined;
      tmpChainRootCall = $;
      tmpChainElementCall = tmpChainRootCall(b);
      if (tmpChainElementCall) {
        const tmpChainRootComputed = $('x');
        const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
        if (tmpChainElementObject) {
          const tmpChainRootComputed$1 = $('y');
          const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
          a = tmpChainElementObject$1;
        }
      }
      $(a);
    }
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$3) {
      $('fail1');
    }
    const tmpIfTest$4 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$4) {
      $('fail2');
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
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 1
 - 5: 'fail1'
 - 6: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
