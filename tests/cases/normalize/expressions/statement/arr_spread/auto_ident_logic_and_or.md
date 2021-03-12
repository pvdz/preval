# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Arr spread > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...(($($(1)) && $($(1))) || $($(2)))];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
[...(($($(1)) && $($(1))) || $($(2)))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpArrElToSpread = tmpCallCallee(tmpCalleeParam);
if (tmpArrElToSpread) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpArrElToSpread = tmpCallCallee$1(tmpCalleeParam$1);
}
if (tmpArrElToSpread) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(2);
  tmpArrElToSpread = tmpCallCallee$2(tmpCalleeParam$2);
}
[...tmpArrElToSpread];
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
let tmpArrElToSpread = $(tmpCalleeParam);
if (tmpArrElToSpread) {
  const tmpCalleeParam$1 = $(1);
  tmpArrElToSpread = $(tmpCalleeParam$1);
}
if (tmpArrElToSpread) {
} else {
  const tmpCalleeParam$2 = $(2);
  tmpArrElToSpread = $(tmpCalleeParam$2);
}
[...tmpArrElToSpread];
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
