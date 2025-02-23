# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident opt complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

export let a = $(b)?.x;
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = $(b)?.x;
export { a };
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
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
} else {
}
export { a };
$(a);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { x: 1 };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall.x;
  a = tmpChainElementObject;
}
export { a };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = { x: 1 };
const c = $( b );
const d = c == null;
if (d) {

}
else {
  const e = c.x;
  a = e;
}
export { a as a };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
