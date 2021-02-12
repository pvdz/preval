# Preval test case

# auto_ident_logic_and_and.md

> normalize > expressions > statement > arr_spread > auto_ident_logic_and_and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...($($(1)) && $($(1)) && $($(2)))];
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
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(2);
  tmpArrElToSpread = tmpCallCallee$2(tmpCalleeParam$2);
}
[...tmpArrElToSpread];
$(a);
`````

## Output

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
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(2);
  tmpArrElToSpread = tmpCallCallee$2(tmpCalleeParam$2);
}
[...tmpArrElToSpread];
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
