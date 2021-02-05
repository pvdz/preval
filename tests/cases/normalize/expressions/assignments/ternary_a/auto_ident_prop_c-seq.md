# Preval test case

# auto_ident_prop_c-seq.md

> normalize > expressions > assignments > ternary_a > auto_ident_prop_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b)).c) ? $(100) : $(200));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
let tmpIfTest;
1;
2;
const tmpCompObj = $(b);
const tmpNestedComplexRhs = tmpCompObj.c;
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
let tmpIfTest;
const tmpCompObj = $(b);
const tmpNestedComplexRhs = tmpCompObj.c;
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 100
 - 3: 100
 - 4: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
