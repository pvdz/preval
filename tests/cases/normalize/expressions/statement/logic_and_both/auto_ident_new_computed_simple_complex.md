# Preval test case

# auto_ident_new_computed_simple_complex.md

> normalize > expressions > statement > logic_and_both > auto_ident_new_computed_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
new b[$("$")](1) && new b[$("$")](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCompProp = $('$');
const tmpNewCallee = tmpCompObj[tmpCompProp];
const tmpIfTest = new tmpNewCallee(1);
if (tmpIfTest) {
  const tmpCompObj$1 = b;
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
const tmpCompObj = b;
const tmpCompProp = $('$');
const tmpNewCallee = tmpCompObj[tmpCompProp];
const tmpIfTest = new tmpNewCallee(1);
if (tmpIfTest) {
  const tmpCompObj$1 = b;
  const tmpCompProp$1 = $('$');
  const tmpNewCallee$1 = tmpCompObj$1[tmpCompProp$1];
  new tmpNewCallee$1(1);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: '$'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
