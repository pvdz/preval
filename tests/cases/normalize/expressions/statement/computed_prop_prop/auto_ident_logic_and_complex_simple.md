# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident logic and complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$($(1)) && 2];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$($(1)) && 2];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpCompProp = tmpCallCallee(tmpCalleeParam);
if (tmpCompProp) {
  tmpCompProp = 2;
}
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const obj = {};
const tmpCalleeParam = $(1);
let tmpCompProp = $(tmpCalleeParam);
if (tmpCompProp) {
  tmpCompProp = 2;
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
