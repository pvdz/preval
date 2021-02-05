# Preval test case

# auto_ident_opt_call_simple.md

> normalize > expressions > statement > tagged > auto_ident_opt_call_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${$?.(1)} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1 = undefined;
const tmpChainRootCall = $;
if (tmpChainRootCall) {
  const tmpChainElementCall = tmpChainRootCall(1);
  tmpCalleeParam$1 = tmpChainElementCall;
}
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1 = undefined;
const tmpChainRootCall = $;
if (tmpChainRootCall) {
  const tmpChainElementCall = tmpChainRootCall(1);
  tmpCalleeParam$1 = tmpChainElementCall;
}
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: ['before ', ' after'], 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
