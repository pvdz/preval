# Preval test case

# auto_ident_c-opt_complex_complex.md

> normalize > expressions > statement > do_while > auto_ident_c-opt_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($(b)?.[$("x")]);
$(a);
`````

## Normalized

`````js filename=intro
var tmpDoWhileTest;
let b = { x: 1 };
let a = { a: 999, b: 1000 };
do {
  $(100);
  tmpDoWhileTest = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  if (tmpChainElementCall) {
    const tmpChainRootComputed = $('x');
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    tmpDoWhileTest = tmpChainElementObject;
  }
} while (tmpDoWhileTest);
$(a);
`````

## Output

`````js filename=intro
var tmpDoWhileTest;
let b = { x: 1 };
let a = { a: 999, b: 1000 };
do {
  $(100);
  tmpDoWhileTest = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  if (tmpChainElementCall) {
    const tmpChainRootComputed = $('x');
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    tmpDoWhileTest = tmpChainElementObject;
  }
} while (tmpDoWhileTest);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: 'x'
 - 4: 100
 - 5: { x: '1' }
 - 6: 'x'
 - 7: 100
 - 8: { x: '1' }
 - 9: 'x'
 - 10: 100
 - 11: { x: '1' }
 - 12: 'x'
 - 13: 100
 - 14: { x: '1' }
 - 15: 'x'
 - 16: 100
 - 17: { x: '1' }
 - 18: 'x'
 - 19: 100
 - 20: { x: '1' }
 - 21: 'x'
 - 22: 100
 - 23: { x: '1' }
 - 24: 'x'
 - 25: 100
 - 26: { x: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
