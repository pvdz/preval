# Preval test case

# auto_ident_cond_complex_simple_simple.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident cond complex simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$(1) ? 2 : $($(100))];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$(1) ? 2 : $($(100))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpCompProp = 2;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpCompProp = tmpCallCallee(tmpCalleeParam);
}
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const obj = {};
let tmpCompProp = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpCompProp = 2;
} else {
  const tmpCalleeParam = $(100);
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
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
