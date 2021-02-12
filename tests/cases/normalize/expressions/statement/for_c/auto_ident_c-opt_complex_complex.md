# Preval test case

# auto_ident_c-opt_complex_complex.md

> normalize > expressions > statement > for_c > auto_ident_c-opt_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); $(b)?.[$("x")]);
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpChainRootCall = $;
      const tmpChainElementCall = tmpChainRootCall(b);
      if (tmpChainElementCall) {
        const tmpChainRootComputed = $('x');
        const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
      }
    } else {
      break;
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpChainRootCall = $;
      const tmpChainElementCall = tmpChainRootCall(b);
      if (tmpChainElementCall) {
        const tmpChainRootComputed = $('x');
        const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
      }
    } else {
      break;
    }
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '1' }
 - 3: 'x'
 - 4: 1
 - 5: { x: '1' }
 - 6: 'x'
 - 7: 1
 - 8: { x: '1' }
 - 9: 'x'
 - 10: 1
 - 11: { x: '1' }
 - 12: 'x'
 - 13: 1
 - 14: { x: '1' }
 - 15: 'x'
 - 16: 1
 - 17: { x: '1' }
 - 18: 'x'
 - 19: 1
 - 20: { x: '1' }
 - 21: 'x'
 - 22: 1
 - 23: { x: '1' }
 - 24: 'x'
 - 25: 1
 - 26: { x: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
