# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Statement > If > Auto ident c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
if ($(b)?.[$("x")]);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
if ($(b)?.[$(`x`)]);
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest$1 = tmpChainElementCall != null;
if (tmpIfTest$1) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  tmpIfTest = tmpChainElementObject;
} else {
}
$(a);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
const tmpChainElementCall = $(b);
const tmpIfTest$1 = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpChainRootComputed = $(`x`);
  tmpChainElementCall[tmpChainRootComputed];
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = {
a: 999,
b: 1000
;
const c = $( a );
const d = c == null;
if (d) {

}
else {
  const e = $( "x" );
  c[ e ];
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
