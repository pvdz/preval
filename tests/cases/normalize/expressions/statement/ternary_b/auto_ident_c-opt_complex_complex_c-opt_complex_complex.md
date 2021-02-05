# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> normalize > expressions > statement > ternary_b > auto_ident_c-opt_complex_complex_c-opt_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$(1) ? $(b)?.[$("x")]?.[$("y")] : $(200);
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
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
} else {
  $(200);
}
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  if (tmpChainElementCall) {
    const tmpChainRootComputed = $('x');
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    if (tmpChainElementObject) {
      const tmpChainRootComputed$1 = $('y');
      tmpChainElementObject[tmpChainRootComputed$1];
    }
  }
} else {
  $(200);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { x: '{"y":"1"}' }
 - 3: 'x'
 - 4: 'y'
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
