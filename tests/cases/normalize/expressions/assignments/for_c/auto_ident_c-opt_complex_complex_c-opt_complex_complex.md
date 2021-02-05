# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> normalize > expressions > assignments > for_c > auto_ident_c-opt_complex_complex_c-opt_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
for (; $(1); a = $(b)?.[$("x")]?.[$("y")]);
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      a = undefined;
      const tmpChainRootCall = $;
      const tmpChainElementCall = tmpChainRootCall(b);
      if (tmpChainElementCall) {
        const tmpChainRootComputed = $('x');
        const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
        if (tmpChainElementObject) {
          const tmpChainRootComputed$1 = $('y');
          const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
          a = tmpChainElementObject$1;
        }
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
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    a = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall(b);
    if (tmpChainElementCall) {
      const tmpChainRootComputed = $('x');
      const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
      if (tmpChainElementObject) {
        const tmpChainRootComputed$1 = $('y');
        const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
        a = tmpChainElementObject$1;
      }
    }
  } else {
    break;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '{"y":"1"}' }
 - 3: 'x'
 - 4: 'y'
 - 5: 1
 - 6: { x: '{"y":"1"}' }
 - 7: 'x'
 - 8: 'y'
 - 9: 1
 - 10: { x: '{"y":"1"}' }
 - 11: 'x'
 - 12: 'y'
 - 13: 1
 - 14: { x: '{"y":"1"}' }
 - 15: 'x'
 - 16: 'y'
 - 17: 1
 - 18: { x: '{"y":"1"}' }
 - 19: 'x'
 - 20: 'y'
 - 21: 1
 - 22: { x: '{"y":"1"}' }
 - 23: 'x'
 - 24: 'y'
 - 25: 1
 - 26: { x: '{"y":"1"}' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
