# Preval test case

# auto_ident_opt_complex.md

> normalize > expressions > assignments > for_b > auto_ident_opt_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; (a = $(b)?.x); $(1));
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
      const tmpChainElementObject = tmpChainElementCall.x;
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
let b = { x: 1 };
let a = { a: 999, b: 1000 };
{
  while (true) {
    let tmpIfTest;
    let tmpNestedComplexRhs = undefined;
    const tmpChainElementCall = $(b);
    if (tmpChainElementCall) {
      const tmpChainElementObject = tmpChainElementCall.x;
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

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: { x: '1' }
 - 4: 1
 - 5: { x: '1' }
 - 6: 1
 - 7: { x: '1' }
 - 8: 1
 - 9: { x: '1' }
 - 10: 1
 - 11: { x: '1' }
 - 12: 1
 - 13: { x: '1' }
 - 14: 1
 - 15: { x: '1' }
 - 16: 1
 - 17: { x: '1' }
 - 18: 1
 - 19: { x: '1' }
 - 20: 1
 - 21: { x: '1' }
 - 22: 1
 - 23: { x: '1' }
 - 24: 1
 - 25: { x: '1' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
