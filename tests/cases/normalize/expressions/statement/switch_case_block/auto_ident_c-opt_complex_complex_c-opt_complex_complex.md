# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> normalize > expressions > statement > switch_case_block > auto_ident_c-opt_complex_complex_c-opt_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    $(b)?.[$("x")]?.[$("y")];
  }
}
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
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
        const tmpChainRootCall = $;
        const tmpChainElementCall = tmpChainRootCall(b);
        if (tmpChainElementCall) {
          const tmpChainRootComputed = $('x');
          const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
          if (tmpChainElementObject) {
            const tmpChainRootComputed$1 = $('y');
            const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
          }
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
 - 3: { x: '{"y":"1"}' }
 - 4: 'x'
 - 5: 'y'
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
