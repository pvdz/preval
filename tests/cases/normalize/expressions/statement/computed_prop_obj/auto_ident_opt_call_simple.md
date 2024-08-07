# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
($?.(1))["a"];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
($?.(1))[`a`];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  tmpCompObj = tmpChainElementCall;
} else {
}
tmpCompObj.a;
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpCompObj = undefined;
const tmpIfTest = $ == null;
if (tmpIfTest) {
} else {
  const tmpChainElementCall = $(1);
  tmpCompObj = tmpChainElementCall;
}
tmpCompObj.a;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
let b = undefined;
const c = $ == null;
if (c) {

}
else {
  const d = $( 1 );
  b = d;
}
b.a;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
