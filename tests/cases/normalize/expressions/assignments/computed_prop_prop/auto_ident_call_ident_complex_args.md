# Preval test case

# auto_ident_call_ident_complex_args.md

> normalize > expressions > assignments > computed_prop_prop > auto_ident_call_ident_complex_args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = $($(1), $(2)))];
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
let tmpCompProp = a;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
$;
let a = { a: 999, b: 1000 };
const obj = {};
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
a = $(tmpCalleeParam, tmpCalleeParam$1);
const tmpCompProp = a;
obj[tmpCompProp];
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
