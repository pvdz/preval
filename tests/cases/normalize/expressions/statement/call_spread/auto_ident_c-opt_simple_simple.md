# Preval test case

# auto_ident_c-opt_simple_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident c-opt simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(...b?.["x"]);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(...b?.['x']);
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = 'x';
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  tmpCalleeParamSpread = tmpChainElementObject;
}
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
let tmpCalleeParamSpread = undefined;
const tmpIfTest = b != null;
if (tmpIfTest) {
  const tmpChainElementObject = b.x;
  tmpCalleeParamSpread = tmpChainElementObject;
}
$(...tmpCalleeParamSpread);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
