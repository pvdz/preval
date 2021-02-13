# Preval test case

# auto_ident_logic_or_and.md

> normalize > expressions > statement > call_spread > auto_ident_logic_or_and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($($(0)) || ($($(1)) && $($(2)))));
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
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$1 = $(1);
  tmpCalleeParamSpread = tmpCallCallee$2(tmpCalleeParam$1);
  if (tmpCalleeParamSpread) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$2 = $(2);
    tmpCalleeParamSpread = tmpCallCallee$3(tmpCalleeParam$2);
  }
}
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let tmpCalleeParamSpread = $(tmpCalleeParam);
if (tmpCalleeParamSpread) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpCalleeParamSpread = $(tmpCalleeParam$1);
  if (tmpCalleeParamSpread) {
    const tmpCalleeParam$2 = $(2);
    tmpCalleeParamSpread = $(tmpCalleeParam$2);
  }
}
$(...tmpCalleeParamSpread);
$(a);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Normalized calls: Same

Final output calls: Same