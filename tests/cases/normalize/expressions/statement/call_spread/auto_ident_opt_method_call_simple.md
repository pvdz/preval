# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
$(...b?.c(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
$(...b?.c(1));
$(a);
`````

## Normalized

`````js filename=intro
let b = { c: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = tmpChainElementObject.call(tmpChainRootProp, 1);
  tmpCalleeParamSpread = tmpChainElementCall;
}
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
const b = { c: $ };
const a = { a: 999, b: 1000 };
let tmpCalleeParamSpread = undefined;
const tmpIfTest = b != null;
if (tmpIfTest) {
  const tmpChainElementObject = b.c;
  const tmpChainElementCall = tmpChainElementObject.call(b, 1);
  tmpCalleeParamSpread = tmpChainElementCall;
}
$(...tmpCalleeParamSpread);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
