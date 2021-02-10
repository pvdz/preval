# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> normalize > expressions > assignments > logic_and_both > auto_ident_computed_s-seq_simple_assign_complex_member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
$(
  (a = (1, 2, b)[$("c")] = $(b)[$("d")]) &&
    (a = (1, 2, b)[$("c")] = $(b)[$("d")])
);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs;
const tmpNestedAssignComMemberObj = b;
const tmpNestedAssignComMemberProp = $('c');
const tmpCompObj = $(b);
const tmpCompProp = $('d');
let tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs$1;
  const tmpNestedAssignComMemberObj$1 = b;
  const tmpNestedAssignComMemberProp$1 = $('c');
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $('d');
  let tmpNestedAssignPropRhs$1 = tmpCompObj$1[tmpCompProp$1];
  const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$1;
  tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$1;
  tmpNestedComplexRhs$1 = tmpNestedPropAssignRhs$1;
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 'c'
 - 5: { c: '20', d: '20' }
 - 6: 'd'
 - 7: 20
 - 8: 20, { c: '20', d: '20' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
