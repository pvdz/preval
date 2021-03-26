# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident call ident complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$({ [(a = $($(1), $(2)))]: 10 });
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
$({ [(a = $($(1), $(2)))]: 10 });
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
a = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
const SSA_a = $(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpCalleeParam = { [SSA_a]: 10 };
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: { 1: '10' }
 - 5: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
