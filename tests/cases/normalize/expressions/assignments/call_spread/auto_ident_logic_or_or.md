# Preval test case

# auto_ident_logic_or_or.md

> normalize > expressions > assignments > call_spread > auto_ident_logic_or_or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = $($(0)) || $($(1)) || $($(2))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam = $(0);
a = tmpCallCallee$1(tmpCalleeParam);
if (a) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$1 = $(1);
  a = tmpCallCallee$2(tmpCalleeParam$1);
}
if (a) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$2 = $(2);
  a = tmpCallCallee$3(tmpCalleeParam$2);
}
let tmpCalleeParamSpread = a;
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
a = $(tmpCalleeParam);
if (a) {
} else {
  const tmpCalleeParam$1 = $(1);
  a = $(tmpCalleeParam$1);
}
if (a) {
} else {
  const tmpCalleeParam$2 = $(2);
  a = $(tmpCalleeParam$2);
}
let tmpCalleeParamSpread = a;
$(...tmpCalleeParamSpread);
$(a);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Normalized calls: Same

Final output calls: Same
