# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> normalize > expressions > assignments > logic_and_both > auto_ident_delete_computed_s-seq_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(
  (a = delete ($(1), $(2), arg)[$("y")]) &&
    (a = delete ($(1), $(2), arg)[$("y")])
);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(1);
$(2);
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $('y');
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(1);
  $(2);
  const tmpDeleteCompObj$1 = arg;
  const tmpDeleteCompProp$1 = $('y');
  const tmpNestedComplexRhs = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $('y');
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(1);
  $(2);
  const tmpDeleteCompObj$1 = arg;
  const tmpDeleteCompProp$1 = $('y');
  const tmpNestedComplexRhs = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'y'
 - 4: 1
 - 5: 2
 - 6: 'y'
 - 7: true
 - 8: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same