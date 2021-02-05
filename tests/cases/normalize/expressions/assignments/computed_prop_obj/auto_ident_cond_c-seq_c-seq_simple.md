# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> normalize > expressions > assignments > computed_prop_obj > auto_ident_cond_c-seq_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100)))["a"];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
let tmpNestedComplexRhs = undefined;
10;
20;
const tmpIfTest = $(30);
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
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
({});
let tmpCompObj;
let tmpNestedComplexRhs = undefined;
const tmpIfTest = $(30);
if (tmpIfTest) {
  tmpNestedComplexRhs = $(60);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
}
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a);
`````

## Result

Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
