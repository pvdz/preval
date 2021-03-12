# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Call > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(($($(1)) && $($(1))) || $($(2)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(($($(1)) && $($(1))) || $($(2)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
let tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpCalleeParam) {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(1);
  tmpCalleeParam = tmpCallCallee$2(tmpCalleeParam$2);
}
if (tmpCalleeParam) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  tmpCalleeParam = tmpCallCallee$3(tmpCalleeParam$3);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(1);
let tmpCalleeParam = $(tmpCalleeParam$1);
if (tmpCalleeParam) {
  const tmpCalleeParam$2 = $(1);
  tmpCalleeParam = $(tmpCalleeParam$2);
}
if (tmpCalleeParam) {
} else {
  const tmpCalleeParam$3 = $(2);
  tmpCalleeParam = $(tmpCalleeParam$3);
}
$(tmpCalleeParam);
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
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
