# Preval test case

# auto_ident_call_prop_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident call prop complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$`before ${(a = $(b).$(1))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
$`before ${(a = $(b).$(1))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpCallObj = $(b);
a = tmpCallObj.$(1);
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpCalleeParam = ['before ', ' after'];
const tmpCallObj = $(b);
const SSA_a = tmpCallObj.$(1);
$(tmpCalleeParam, SSA_a);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: ['before ', ' after'], 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
