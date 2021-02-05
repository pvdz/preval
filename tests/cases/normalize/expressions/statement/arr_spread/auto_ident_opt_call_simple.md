# Preval test case

# auto_ident_opt_call_simple.md

> normalize > expressions > statement > arr_spread > auto_ident_opt_call_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...$?.(1)];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpArrElToSpread = undefined;
const tmpChainRootCall = $;
if (tmpChainRootCall) {
  const tmpChainElementCall = tmpChainRootCall(1);
  tmpArrElToSpread = tmpChainElementCall;
}
[...tmpArrElToSpread];
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpArrElToSpread = undefined;
const tmpChainRootCall = $;
if (tmpChainRootCall) {
  const tmpChainElementCall = tmpChainRootCall(1);
  tmpArrElToSpread = tmpChainElementCall;
}
[...tmpArrElToSpread];
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
