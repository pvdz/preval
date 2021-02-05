# Preval test case

# auto_ident_logic_or_simple_simple.md

> normalize > expressions > statement > regular_prop_obj > auto_ident_logic_or_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(0 || 2).a;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj = 0;
if (tmpCompObj) {
} else {
  tmpCompObj = 2;
}
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
({});
let tmpCompObj = 0;
if (tmpCompObj) {
} else {
  tmpCompObj = 2;
}
tmpCompObj.a;
$(a);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
