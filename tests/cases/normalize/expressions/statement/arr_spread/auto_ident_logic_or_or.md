# Preval test case

# auto_ident_logic_or_or.md

> normalize > expressions > statement > arr_spread > auto_ident_logic_or_or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...($($(0)) || $($(1)) || $($(2)))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpArrElToSpread = tmpCallCallee(tmpCalleeParam);
if (tmpArrElToSpread) {
} else {
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
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let tmpArrElToSpread = $(tmpCalleeParam);
if (tmpArrElToSpread) {
} else {
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

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same