# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Assignments > Let > Auto ident call complex complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let xyz = (a = $($)($(1), $(2)));
$(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
let xyz = (a = $($)($(1), $(2)));
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
let xyz = a;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
const tmpCallCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const SSA_a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(SSA_a);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
