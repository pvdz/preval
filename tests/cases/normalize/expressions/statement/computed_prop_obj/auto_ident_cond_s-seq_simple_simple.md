# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> normalize > expressions > statement > computed_prop_obj > auto_ident_cond_s-seq_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
((10, 20, 30) ? $(2) : $($(100)))["a"];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  tmpCompObj = $(2);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpCompObj = tmpCallCallee(tmpCalleeParam);
}
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj = undefined;
if (30) {
  tmpCompObj = $(2);
} else {
  const tmpCalleeParam = $(100);
  tmpCompObj = $(tmpCalleeParam);
}
tmpCompObj.a;
$(a);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same