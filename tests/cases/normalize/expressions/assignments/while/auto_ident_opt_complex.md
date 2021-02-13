# Preval test case

# auto_ident_opt_complex.md

> normalize > expressions > assignments > while > auto_ident_opt_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
while ((a = $(b)?.x)) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainElementCall.x;
    a = tmpChainElementObject;
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
  const tmpChainElementCall = $(b);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainElementCall.x;
    a = tmpChainElementObject;
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 100
 - 3: { x: '1' }
 - 4: 100
 - 5: { x: '1' }
 - 6: 100
 - 7: { x: '1' }
 - 8: 100
 - 9: { x: '1' }
 - 10: 100
 - 11: { x: '1' }
 - 12: 100
 - 13: { x: '1' }
 - 14: 100
 - 15: { x: '1' }
 - 16: 100
 - 17: { x: '1' }
 - 18: 100
 - 19: { x: '1' }
 - 20: 100
 - 21: { x: '1' }
 - 22: 100
 - 23: { x: '1' }
 - 24: 100
 - 25: { x: '1' }
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
