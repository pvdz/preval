# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> normalize > expressions > statement > switch_case_top > auto_ident_opt_c-mem_call_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    $(b)?.[$("$")]?.($(1));
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
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
      const tmpChainRootCall = $;
      const tmpChainElementCall = tmpChainRootCall(b);
      if (tmpChainElementCall) {
        const tmpChainRootComputed = $('$');
        const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
        if (tmpChainElementObject) {
          const tmpCallObj = tmpChainElementObject;
          const tmpCallVal = tmpCallObj.call;
          const tmpCalleeParam = tmpChainElementCall;
          const tmpCalleeParam$1 = $(1);
          const tmpChainElementCall$1 = tmpCallVal.call(tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
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
 - 3: { $: '"<$>"' }
 - 4: '$'
 - 5: 1
 - 6: 1
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
