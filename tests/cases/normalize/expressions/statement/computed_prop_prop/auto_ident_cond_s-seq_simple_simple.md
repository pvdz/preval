# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> normalize > expressions > statement > computed_prop_prop > auto_ident_cond_s-seq_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(10, 20, 30) ? $(2) : $($(100))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  tmpCompProp = $(2);
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
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompProp = undefined;
tmpCompProp = $(2);
obj[tmpCompProp];
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
