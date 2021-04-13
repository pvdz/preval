# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
($($(1)) && $($(1)) && $($(2)))["a"];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
($($(1)) && $($(1)) && $($(2)))['a'];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpCompObj = tmpCallCallee(tmpCalleeParam);
if (tmpCompObj) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpCompObj = tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
if (tmpCompObj) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  tmpCompObj = tmpCallCallee$3(tmpCalleeParam$3);
} else {
}
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
let tmpCompObj = $(tmpCalleeParam);
if (tmpCompObj) {
  const tmpCalleeParam$1 = $(1);
  tmpCompObj = $(tmpCalleeParam$1);
} else {
}
if (tmpCompObj) {
  const tmpCalleeParam$3 = $(2);
  tmpCompObj = $(tmpCalleeParam$3);
} else {
}
tmpCompObj.a;
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
 - 5: 2
 - 6: 2
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
