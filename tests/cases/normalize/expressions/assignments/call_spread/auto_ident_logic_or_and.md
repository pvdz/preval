# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Call spread > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = $($(0)) || ($($(1)) && $($(2)))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = $($(0)) || ($($(1)) && $($(2)))));
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
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$1 = $(1);
  a = tmpCallCallee$3(tmpCalleeParam$1);
  if (a) {
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$3 = $(2);
    a = tmpCallCallee$5(tmpCalleeParam$3);
  } else {
  }
}
let tmpCalleeParamSpread = a;
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(0);
let a = $(tmpCalleeParam);
if (a) {
} else {
  const tmpCalleeParam$1 = $(1);
  a = $(tmpCalleeParam$1);
  if (a) {
    const tmpCalleeParam$3 = $(2);
    a = $(tmpCalleeParam$3);
  } else {
  }
}
const tmpCalleeParamSpread = a;
$(...tmpCalleeParamSpread);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
