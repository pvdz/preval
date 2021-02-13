# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> normalize > expressions > assignments > arr_element > auto_ident_c-opt_complex_complex_c-opt_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$((a = $(b)?.[$("x")]?.[$("y")]) + (a = $(b)?.[$("x")]?.[$("y")]));
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $('x');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed$1 = $('y');
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    a = tmpChainElementObject$1;
  }
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$1 = tmpChainRootCall$1(b);
const tmpIfTest$2 = tmpChainElementCall$1 != null;
if (tmpIfTest$2) {
  const tmpChainRootComputed$2 = $('x');
  const tmpChainElementObject$2 = tmpChainElementCall$1[tmpChainRootComputed$2];
  const tmpIfTest$3 = tmpChainElementObject$2 != null;
  if (tmpIfTest$3) {
    const tmpChainRootComputed$3 = $('y');
    const tmpChainElementObject$3 = tmpChainElementObject$2[tmpChainRootComputed$3];
    a = tmpChainElementObject$3;
  }
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $('x');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed$1 = $('y');
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    a = tmpChainElementObject$1;
  }
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainElementCall$1 = $(b);
const tmpIfTest$2 = tmpChainElementCall$1 != null;
if (tmpIfTest$2) {
  const tmpChainRootComputed$2 = $('x');
  const tmpChainElementObject$2 = tmpChainElementCall$1[tmpChainRootComputed$2];
  const tmpIfTest$3 = tmpChainElementObject$2 != null;
  if (tmpIfTest$3) {
    const tmpChainRootComputed$3 = $('y');
    const tmpChainElementObject$3 = tmpChainElementObject$2[tmpChainRootComputed$3];
    a = tmpChainElementObject$3;
  }
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: { x: '{"y":"1"}' }
 - 5: 'x'
 - 6: 'y'
 - 7: 2
 - 8: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
