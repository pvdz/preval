# Preval test case

# auto_ident_computed_complex_simple_assign_complex_member.md

> normalize > expressions > assignments > ternary_a > auto_ident_computed_complex_simple_assign_complex_member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$((a = $(b)["c"] = $(b)[$("d")]) ? $(100) : $(200));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
let tmpIfTest;
let tmpNestedComplexRhs;
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $('d');
let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj['c'] = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
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
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
let tmpIfTest;
let tmpNestedComplexRhs;
const tmpNestedAssignObj = $(b);
const tmpCompObj = $(b);
const tmpCompProp = $('d');
let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
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
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 100
 - 5: 100
 - 6: 20, { c: '20', d: '20' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
