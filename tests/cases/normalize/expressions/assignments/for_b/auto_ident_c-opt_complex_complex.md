# Preval test case

# auto_ident_c-opt_complex_complex.md

> normalize > expressions > assignments > for_b > auto_ident_c-opt_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; (a = $(b)?.[$("x")]); $(1));
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while (true) {
    let tmpIfTest;
    let tmpNestedComplexRhs = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall(b);
    if (tmpChainElementCall) {
      const tmpChainRootComputed = $('x');
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
      tmpNestedComplexRhs = tmpChainElementObject;
    }
    a = tmpNestedComplexRhs;
    tmpIfTest = tmpNestedComplexRhs;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
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
 - 1: { x: '1' }
 - 2: 'x'
 - 3: 1
 - 4: { x: '1' }
 - 5: 'x'
 - 6: 1
 - 7: { x: '1' }
 - 8: 'x'
 - 9: 1
 - 10: { x: '1' }
 - 11: 'x'
 - 12: 1
 - 13: { x: '1' }
 - 14: 'x'
 - 15: 1
 - 16: { x: '1' }
 - 17: 'x'
 - 18: 1
 - 19: { x: '1' }
 - 20: 'x'
 - 21: 1
 - 22: { x: '1' }
 - 23: 'x'
 - 24: 1
 - 25: { x: '1' }
 - 26: 'x'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
