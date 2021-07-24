# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { c: $ };

  let a = { a: 999, b: 1000 };
  b?.c(1);
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let b = { c: $ };
  let a = { a: 999, b: 1000 };
  b?.c(1);
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = { c: $ };
  let a = { a: 999, b: 1000 };
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
  } else {
  }
  $(a);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const b = { c: $ };
$dotCall($, b, 1);
const a = { a: 999, b: 1000 };
$(a);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
