# Preval test case

# auto_ident_logic_and_complex_complex.md

> normalize > expressions > assignments > regular_prop_obj > auto_ident_logic_and_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = $($(1)) && $($(2))).a;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCompObj;
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
if (tmpNestedComplexRhs) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
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
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
if (tmpNestedComplexRhs) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
}
a = tmpNestedComplexRhs;
tmpCompObj = tmpNestedComplexRhs;
tmpCompObj.a;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
