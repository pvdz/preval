# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> normalize > expressions > assignments > computed_prop_prop > auto_ident_cond_complex_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = $(1) ? (40, 50, $(60)) : $($(100)))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp;
let tmpNestedComplexRhs = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  40;
  50;
  tmpNestedComplexRhs = $(60);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
}
a = tmpNestedComplexRhs;
tmpCompProp = tmpNestedComplexRhs;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCompProp;
let tmpNestedComplexRhs = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpNestedComplexRhs = $(60);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
}
a = tmpNestedComplexRhs;
tmpCompProp = tmpNestedComplexRhs;
tmpCompObj[tmpCompProp];
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
