# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Call spread > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($($(0)) || $($(2))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($($(0)) || $($(2))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam = $(0);
let tmpCalleeParamSpread = tmpCallCallee$1(tmpCalleeParam);
if (tmpCalleeParamSpread) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$1 = $(2);
  tmpCalleeParamSpread = tmpCallCallee$3(tmpCalleeParam$1);
}
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let tmpCalleeParamSpread = $(tmpCalleeParam);
if (tmpCalleeParamSpread) {
} else {
  const tmpCalleeParam$1 = $(2);
  tmpCalleeParamSpread = $(tmpCalleeParam$1);
}
$(...tmpCalleeParamSpread);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
