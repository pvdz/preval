# Preval test case

# auto_ident_new_complex_complex_args.md

> normalize > expressions > statement > computed_prop_prop > auto_ident_new_complex_complex_args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[new ($($))($(1), $(2))];
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpNewCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpCompProp = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpNewCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpCompProp = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
tmpCompObj[tmpCompProp];
$(a);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same