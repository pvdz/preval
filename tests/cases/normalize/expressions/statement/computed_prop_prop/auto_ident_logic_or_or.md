# Preval test case

# auto_ident_logic_or_or.md

> normalize > expressions > statement > computed_prop_prop > auto_ident_logic_or_or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$($(0)) || $($(1)) || $($(2))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpCompProp = tmpCallCallee(tmpCalleeParam);
if (tmpCompProp) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpCompProp = tmpCallCallee$1(tmpCalleeParam$1);
}
if (tmpCompProp) {
} else {
  const tmpCallCallee$2 = $;
  const tmpCalleeParam$2 = $(2);
  tmpCompProp = tmpCallCallee$2(tmpCalleeParam$2);
}
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCalleeParam = $(0);
let tmpCompProp = $(tmpCalleeParam);
if (tmpCompProp) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpCompProp = $(tmpCalleeParam$1);
}
if (tmpCompProp) {
} else {
  const tmpCalleeParam$2 = $(2);
  tmpCompProp = $(tmpCalleeParam$2);
}
tmpCompObj[tmpCompProp];
$(a);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same