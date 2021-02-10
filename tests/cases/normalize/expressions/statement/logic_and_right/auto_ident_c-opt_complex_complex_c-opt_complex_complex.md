# Preval test case

# auto_ident_c-opt_complex_complex_c-opt_complex_complex.md

> normalize > expressions > statement > logic_and_right > auto_ident_c-opt_complex_complex_c-opt_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$(100) && $(b)?.[$("x")]?.[$("y")];
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
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
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { x: '{"y":"1"}' }
 - 3: 'x'
 - 4: 'y'
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
