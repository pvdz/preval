# Preval test case

# auto_base_assign_ident.md

> normalize > expressions > assignments > ternary_c > auto_base_assign_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = b = $(2)));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  let tmpNestedComplexRhs;
  const tmpNestedComplexRhs$1 = $(2);
  b = tmpNestedComplexRhs$1;
  tmpNestedComplexRhs = tmpNestedComplexRhs$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
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
 - 1: 0
 - 2: 2
 - 3: 2
 - 4: 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
