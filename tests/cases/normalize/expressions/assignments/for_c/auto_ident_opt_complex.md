# Preval test case

# auto_ident_opt_complex.md

> normalize > expressions > assignments > for_c > auto_ident_opt_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = $(b)?.x);
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
      a = undefined;
      const tmpChainRootCall = $;
      const tmpChainElementCall = tmpChainRootCall(b);
      if (tmpChainElementCall) {
        const tmpChainElementObject = tmpChainElementCall.x;
        a = tmpChainElementObject;
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
      a = undefined;
      const tmpChainElementCall = $(b);
      if (tmpChainElementCall) {
        const tmpChainElementObject = tmpChainElementCall.x;
        a = tmpChainElementObject;
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
 - 3: 1
 - 4: { x: '1' }
 - 5: 1
 - 6: { x: '1' }
 - 7: 1
 - 8: { x: '1' }
 - 9: 1
 - 10: { x: '1' }
 - 11: 1
 - 12: { x: '1' }
 - 13: 1
 - 14: { x: '1' }
 - 15: 1
 - 16: { x: '1' }
 - 17: 1
 - 18: { x: '1' }
 - 19: 1
 - 20: { x: '1' }
 - 21: 1
 - 22: { x: '1' }
 - 23: 1
 - 24: { x: '1' }
 - 25: 1
 - 26: { x: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same