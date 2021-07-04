# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Tagged > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${$($)?.($(1))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], $($)?.($(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
let tmpCalleeParam$1 = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpCallCallee$1 = $dotCall;
  const tmpCalleeParam$3 = tmpChainElementCall;
  const tmpCalleeParam$5 = tmpChainRootCall;
  const tmpCalleeParam$7 = $(1);
  const tmpChainElementCall$1 = tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5, tmpCalleeParam$7);
  tmpCalleeParam$1 = tmpChainElementCall$1;
} else {
}
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
  $(tmpCalleeParam, undefined);
} else {
  const tmpCalleeParam$7 = $(1);
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, tmpCalleeParam$7);
  $(tmpCalleeParam, tmpChainElementCall$1);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: ['before ', ' after'], 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
