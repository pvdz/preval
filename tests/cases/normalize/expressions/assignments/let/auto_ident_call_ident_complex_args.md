# Preval test case

# auto_ident_call_ident_complex_args.md

> normalize > expressions > assignments > let > auto_ident_call_ident_complex_args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let xyz = (a = $($(1), $(2)));
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let xyz;
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
a = tmpNestedComplexRhs;
xyz = tmpNestedComplexRhs;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
({ $: $ });
let a = { a: 999, b: 1000 };
let xyz;
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
a = tmpNestedComplexRhs;
xyz = tmpNestedComplexRhs;
$(xyz);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - 5: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
