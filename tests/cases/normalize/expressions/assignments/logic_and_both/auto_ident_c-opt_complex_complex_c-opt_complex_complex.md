# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> normalize > expressions > assignments > logic_and_both > auto_ident_c-opt_complex_complex_c-opt_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$((a = $(b)?.[$("x")]?.[$("y")]) && (a = $(b)?.[$("x")]?.[$("y")]));
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
if (tmpChainElementCall) {
  const tmpChainRootComputed = $('x');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (tmpChainElementObject) {
    const tmpChainRootComputed$1 = $('y');
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    a = tmpChainElementObject$1;
  }
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$1 = tmpChainRootCall$1(b);
  if (tmpChainElementCall$1) {
    const tmpChainRootComputed$2 = $('x');
    const tmpChainElementObject$2 = tmpChainElementCall$1[tmpChainRootComputed$2];
    if (tmpChainElementObject$2) {
      const tmpChainRootComputed$3 = $('y');
      const tmpChainElementObject$3 = tmpChainElementObject$2[tmpChainRootComputed$3];
      tmpNestedComplexRhs = tmpChainElementObject$3;
    }
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
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
if (tmpChainElementCall) {
  const tmpChainRootComputed = $('x');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (tmpChainElementObject) {
    const tmpChainRootComputed$1 = $('y');
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    a = tmpChainElementObject$1;
  }
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpChainElementCall$1 = $(b);
  if (tmpChainElementCall$1) {
    const tmpChainRootComputed$2 = $('x');
    const tmpChainElementObject$2 = tmpChainElementCall$1[tmpChainRootComputed$2];
    if (tmpChainElementObject$2) {
      const tmpChainRootComputed$3 = $('y');
      const tmpChainElementObject$3 = tmpChainElementObject$2[tmpChainRootComputed$3];
      tmpNestedComplexRhs = tmpChainElementObject$3;
    }
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
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
 - 7: 1
 - 8: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same