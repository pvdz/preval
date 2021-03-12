# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident opt complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$([...(a = $(b)?.x)]);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$([...(a = $(b)?.x)]);
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.x;
  a = tmpChainElementObject;
}
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const b = { x: 1 };
let SSA_a = undefined;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.x;
  SSA_a = tmpChainElementObject;
}
const tmpArrSpread = SSA_a;
const tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
