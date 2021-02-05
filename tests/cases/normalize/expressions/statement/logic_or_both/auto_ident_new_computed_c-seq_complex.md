# Preval test case

# auto_ident_new_computed_c-seq_complex.md

> normalize > expressions > statement > logic_or_both > auto_ident_new_computed_c-seq_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
new (1, 2, $(b))[$("$")](1) || new (1, 2, $(b))[$("$")](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
1;
2;
const tmpCompObj = $(b);
const tmpCompProp = $('$');
const tmpNewCallee = tmpCompObj[tmpCompProp];
const tmpIfTest = new tmpNewCallee(1);
if (tmpIfTest) {
} else {
  1;
  2;
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $('$');
  const tmpNewCallee$1 = tmpCompObj$1[tmpCompProp$1];
  new tmpNewCallee$1(1);
}
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpCompProp = $('$');
const tmpNewCallee = tmpCompObj[tmpCompProp];
const tmpIfTest = new tmpNewCallee(1);
if (tmpIfTest) {
} else {
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $('$');
  const tmpNewCallee$1 = tmpCompObj$1[tmpCompProp$1];
  new tmpNewCallee$1(1);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
