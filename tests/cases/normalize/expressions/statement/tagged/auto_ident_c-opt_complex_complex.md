# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Tagged > Auto ident c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$`before ${$(b)?.[$("x")]} after`;
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$([`before `, ` after`], $(b)?.[$(`x`)]);
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
let tmpCalleeParam$1 = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  tmpCalleeParam$1 = tmpChainElementObject;
} else {
}
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
if (tmpIfTest) {
  $(tmpCalleeParam, undefined);
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`x`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  $(tmpCalleeParam, tmpChainElementObject);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = b == null;
const d = [ "before ", " after" ];
if (c) {
  $( d, undefined );
}
else {
  const e = $( "x" );
  const f = b[ e ];
  $( d, f );
}
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: ['before ', ' after'], 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
