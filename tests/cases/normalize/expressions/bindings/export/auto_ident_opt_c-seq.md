# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Bindings > Export > Auto ident opt c-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

export let a = (1, 2, $(b))?.x;
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = (1, 2, $(b))?.x;
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = undefined;
const tmpChainRootProp = $(b);
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
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
const tmpChainRootProp /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainRootProp == null;
if (tmpIfTest) {
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainRootProp.x;
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
