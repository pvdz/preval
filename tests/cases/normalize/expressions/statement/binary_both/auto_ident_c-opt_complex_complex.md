# Preval test case

# auto_ident_c-opt_complex_complex.md

> normalize > expressions > statement > binary_both > auto_ident_c-opt_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(b)?.[$("x")] + $(b)?.[$("x")];
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
if (tmpChainElementCall) {
  const tmpChainRootComputed = $('x');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
}
const tmpChainRootCall$1 = $;
const tmpChainElementCall$1 = tmpChainRootCall$1(b);
if (tmpChainElementCall$1) {
  const tmpChainRootComputed$1 = $('x');
  const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$1];
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { x: '1' }
 - 4: 'x'
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
