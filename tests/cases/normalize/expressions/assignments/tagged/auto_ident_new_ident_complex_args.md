# Preval test case

# auto_ident_new_ident_complex_args.md

> normalize > expressions > assignments > tagged > auto_ident_new_ident_complex_args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$`before ${(a = new $($(1), $(2)))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpNewCallee = $;
const tmpCalleeParam$2 = $(1);
const tmpCalleeParam$3 = $(2);
const tmpNestedComplexRhs = new tmpNewCallee(tmpCalleeParam$2, tmpCalleeParam$3);
a = tmpNestedComplexRhs;
tmpCalleeParam$1 = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpNewCallee = $;
const tmpCalleeParam$2 = $(1);
const tmpCalleeParam$3 = $(2);
const tmpNestedComplexRhs = new tmpNewCallee(tmpCalleeParam$2, tmpCalleeParam$3);
a = tmpNestedComplexRhs;
tmpCalleeParam$1 = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: ['before ', ' after'], {}
 - 5: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
