# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Let > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = ($($(1)) && $($(1))) || $($(2));
$(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = ($($(1)) && $($(1))) || $($(2));
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let xyz = tmpCallCallee(tmpCalleeParam);
if (xyz) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  xyz = tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
if (xyz) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  xyz = tmpCallCallee$3(tmpCalleeParam$3);
}
$(xyz);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
let xyz = $(tmpCalleeParam);
if (xyz) {
  const tmpCalleeParam$1 = $(1);
  xyz = $(tmpCalleeParam$1);
} else {
}
if (xyz) {
} else {
  const tmpCalleeParam$3 = $(2);
  xyz = $(tmpCalleeParam$3);
}
$(xyz);
const a = { a: 999, b: 1000 };
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
