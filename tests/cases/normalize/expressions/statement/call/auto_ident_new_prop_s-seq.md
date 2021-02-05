# Preval test case

# auto_ident_new_prop_s-seq.md

> normalize > expressions > statement > call > auto_ident_new_prop_s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(new (1, 2, b).$(1));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
1;
2;
const tmpCompObj = b;
const tmpNewCallee = tmpCompObj.$;
const tmpCalleeParam = new tmpNewCallee(1);
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCompObj = b;
const tmpNewCallee = tmpCompObj.$;
const tmpCalleeParam = new tmpNewCallee(1);
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
