# Preval test case

# auto_ident_new_prop_complex.md

> normalize > expressions > statement > logic_or_both > auto_ident_new_prop_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
new ($(b).$)(1) || new ($(b).$)(1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
const tmpIfTest = new tmpNewCallee(1);
if (tmpIfTest) {
} else {
  const tmpCompObj$1 = $(b);
  const tmpNewCallee$1 = tmpCompObj$1.$;
  new tmpNewCallee$1(1);
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
