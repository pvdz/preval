# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> normalize > expressions > statement > binary_right > auto_ident_new_computed_s-seq_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(100) + new (1, 2, b)[$("$")](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(100);
1;
2;
const tmpCompObj = b;
const tmpCompProp = $('$');
const tmpNewCallee = tmpCompObj[tmpCompProp];
new tmpNewCallee(1);
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(100);
const tmpCompObj = b;
const tmpCompProp = $('$');
const tmpNewCallee = tmpCompObj[tmpCompProp];
new tmpNewCallee(1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: '$'
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
