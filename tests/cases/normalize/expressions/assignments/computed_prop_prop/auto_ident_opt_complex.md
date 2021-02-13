# Preval test case

# auto_ident_opt_complex.md

> normalize > expressions > assignments > computed_prop_prop > auto_ident_opt_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = $(b)?.x)];
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
if (tmpChainElementCall) {
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
}
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
a = undefined;
const tmpChainElementCall = $(b);
if (tmpChainElementCall) {
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
}
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same