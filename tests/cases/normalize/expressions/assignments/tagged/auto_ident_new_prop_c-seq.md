# Preval test case

# auto_ident_new_prop_c-seq.md

> Normalize > Expressions > Assignments > Tagged > Auto ident new prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$`before ${(a = new (1, 2, $(b)).$(1))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
a = new tmpNewCallee(1);
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpCalleeParam = ['before ', ' after'];
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
const SSA_a = new tmpNewCallee(1);
$(tmpCalleeParam, SSA_a);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: ['before ', ' after'], {}
 - 4: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
