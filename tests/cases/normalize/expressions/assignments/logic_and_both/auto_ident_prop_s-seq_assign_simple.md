# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> normalize > expressions > assignments > logic_and_both > auto_ident_prop_s-seq_assign_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = (1, 2, b).c = 2) && (a = (1, 2, b).c = 2));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs;
1;
2;
const tmpNestedAssignObj = b;
const tmpNestedPropAssignRhs = 2;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpNestedComplexRhs = tmpNestedPropAssignRhs;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs$1;
  1;
  2;
  const tmpNestedAssignObj$1 = b;
  const tmpNestedPropAssignRhs$1 = 2;
  tmpNestedAssignObj$1.c = tmpNestedPropAssignRhs$1;
  tmpNestedComplexRhs$1 = tmpNestedPropAssignRhs$1;
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs;
const tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 2;
tmpNestedComplexRhs = 2;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs$1;
  const tmpNestedAssignObj$1 = b;
  tmpNestedAssignObj$1.c = 2;
  tmpNestedComplexRhs$1 = 2;
  a = tmpNestedComplexRhs$1;
  tmpCalleeParam = tmpNestedComplexRhs$1;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2, { c: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
