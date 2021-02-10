# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> normalize > expressions > statement > binary_both > auto_ident_c-opt_complex_complex_c-opt_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$(b)?.[$("x")]?.[$("y")] + $(b)?.[$("x")]?.[$("y")];
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
if (tmpChainElementCall) {
  const tmpChainRootComputed = $('x');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (tmpChainElementObject) {
    const tmpChainRootComputed$1 = $('y');
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
  }
}
const tmpChainRootCall$1 = $;
const tmpChainElementCall$1 = tmpChainRootCall$1(b);
if (tmpChainElementCall$1) {
  const tmpChainRootComputed$2 = $('x');
  const tmpChainElementObject$2 = tmpChainElementCall$1[tmpChainRootComputed$2];
  if (tmpChainElementObject$2) {
    const tmpChainRootComputed$3 = $('y');
    const tmpChainElementObject$3 = tmpChainElementObject$2[tmpChainRootComputed$3];
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
 - 1: { x: '{"y":"1"}' }
 - 2: 'x'
 - 3: 'y'
 - 4: { x: '{"y":"1"}' }
 - 5: 'x'
 - 6: 'y'
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
