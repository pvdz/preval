# Preval test case

# auto_ident_opt_complex.md

> normalize > expressions > assignments > call > auto_ident_opt_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = $(b)?.x));
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
if (tmpChainElementCall) {
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
}
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainElementCall = $(b);
if (tmpChainElementCall) {
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
}
let tmpCalleeParam = a;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same