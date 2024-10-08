# Preval test case

# auto_ident_opt_s-seq.md

> Normalize > Expressions > Bindings > Export > Auto ident opt s-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

export let a = (1, 2, b)?.x;
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = (1, 2, b)?.x;
export { a };
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = undefined;
const tmpChainRootProp = b;
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
const a /*:number*/ = 1;
export { a };
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 1;
export { a as a };
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
