# Preval test case

# auto_ident_new_computed_simple_simple.md

> normalize > expressions > assignments > tagged > auto_ident_new_computed_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$`before ${(a = new b["$"](1))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpNewCallee = b.$;
const tmpNestedComplexRhs = new tmpNewCallee(1);
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
const tmpNewCallee = b.$;
const tmpNestedComplexRhs = new tmpNewCallee(1);
a = tmpNestedComplexRhs;
tmpCalleeParam$1 = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: ['before ', ' after'], {}
 - 3: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
