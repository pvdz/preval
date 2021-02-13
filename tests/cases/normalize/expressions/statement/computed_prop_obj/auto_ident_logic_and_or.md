# Preval test case

# auto_ident_logic_and_or.md

> normalize > expressions > statement > computed_prop_obj > auto_ident_logic_and_or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(($($(1)) && $($(1))) || $($(2)))["a"];
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
}
if (tmpCompObj) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(2);
  tmpCompObj = tmpCallCallee$2(tmpCalleeParam$2);
}
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCalleeParam = $(1);
let tmpCompObj = $(tmpCalleeParam);
if (tmpCompObj) {
  const tmpCalleeParam$1 = $(1);
  tmpCompObj = $(tmpCalleeParam$1);
}
if (tmpCompObj) {
} else {
  const tmpCalleeParam$2 = $(2);
  tmpCompObj = $(tmpCalleeParam$2);
}
tmpCompObj.a;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same