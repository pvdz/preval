# Preval test case

# auto_ident_logic_||_simple_complex.md

> normalize > expressions > statement > computed_prop_prop > auto_ident_logic_||_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[0 || $($(1))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp = 0;
if (tmpCompProp) {
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpCompProp = tmpCallCallee(tmpCalleeParam);
}
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompProp = 0;
if (tmpCompProp) {
} else {
  const tmpCalleeParam = $(1);
  tmpCompProp = $(tmpCalleeParam);
}
obj[tmpCompProp];
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
