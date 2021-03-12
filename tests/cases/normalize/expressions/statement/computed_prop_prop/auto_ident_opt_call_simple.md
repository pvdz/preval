# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$?.(1)];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$?.(1)];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  tmpCompProp = tmpChainElementCall;
}
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const obj = {};
let tmpCompProp = undefined;
const tmpIfTest = $ != null;
if (tmpIfTest) {
  const tmpChainElementCall = $(1);
  tmpCompProp = tmpChainElementCall;
}
obj[tmpCompProp];
$(a);
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
