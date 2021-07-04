# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident c-opt complex complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = $(b)?.[$("x")];
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = $(b)?.[$(`x`)];
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  a = tmpChainElementObject;
} else {
}
$(a);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  $(tmpChainElementObject);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
