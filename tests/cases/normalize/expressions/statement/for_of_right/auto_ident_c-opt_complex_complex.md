# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Statement > For of right > Auto ident c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (let x of $(b)?.[$("x")]);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
for (let x of $(b)?.[$('x')]);
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpForOfDeclRhs = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $('x');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  tmpForOfDeclRhs = tmpChainElementObject;
}
let x;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
let tmpForOfDeclRhs = undefined;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $('x');
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  tmpForOfDeclRhs = tmpChainElementObject;
}
let x;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
