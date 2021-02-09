# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_c-opt_complex_complex_c-opt_complex_complex
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
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      {
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
    tmpFallthrough = true;
  }
}
`````

## Result

Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
