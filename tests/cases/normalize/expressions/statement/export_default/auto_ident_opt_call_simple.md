# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > Export default > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
export default $?.(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpAnonDefaultExport = $?.(1);
export { tmpAnonDefaultExport as default };
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpAnonDefaultExport = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  tmpAnonDefaultExport = tmpChainElementCall;
} else {
}
export { tmpAnonDefaultExport as default };
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpAnonDefaultExport = undefined;
const tmpIfTest = $ == null;
if (tmpIfTest) {
} else {
  const tmpChainElementCall = $(1);
  tmpAnonDefaultExport = tmpChainElementCall;
}
export { tmpAnonDefaultExport as default };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
let b = undefined;
const c = $ == null;
if (c) {

}
else {
  const d = $( 1 );
  b = d;
}
export { b as default from "undefined"
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
