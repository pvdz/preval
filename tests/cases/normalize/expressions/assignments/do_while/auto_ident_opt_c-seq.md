# Preval test case

# auto_ident_opt_c-seq.md

> normalize > expressions > assignments > do_while > auto_ident_opt_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (1, 2, $(b))?.x));
$(a);
`````

## Normalized

`````js filename=intro
var tmpDoWhileTest;
let b = { x: 1 };
let a = { a: 999, b: 1000 };
do {
  $(100);
  let tmpNestedComplexRhs = undefined;
  1;
  2;
  const tmpChainRootProp = $(b);
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.x;
    tmpNestedComplexRhs = tmpChainElementObject;
  }
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
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
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootProp = $(b);
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.x;
    tmpNestedComplexRhs = tmpChainElementObject;
  }
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '1' }
 - 3: 100
 - 4: { x: '1' }
 - 5: 100
 - 6: { x: '1' }
 - 7: 100
 - 8: { x: '1' }
 - 9: 100
 - 10: { x: '1' }
 - 11: 100
 - 12: { x: '1' }
 - 13: 100
 - 14: { x: '1' }
 - 15: 100
 - 16: { x: '1' }
 - 17: 100
 - 18: { x: '1' }
 - 19: 100
 - 20: { x: '1' }
 - 21: 100
 - 22: { x: '1' }
 - 23: 100
 - 24: { x: '1' }
 - 25: 100
 - 26: { x: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
