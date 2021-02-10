# Preval test case

# auto_ident_computed_complex_simple.md

> normalize > expressions > assignments > logic_or_both > auto_ident_computed_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a = $(b)["c"]) || (a = $(b)["c"]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpCompObj = $(b);
const tmpNestedComplexRhs = tmpCompObj.c;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
if (tmpCalleeParam) {
} else {
  const tmpCompObj$1 = $(b);
  const tmpNestedComplexRhs$1 = tmpCompObj$1.c;
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
 - 1: { c: '1' }
 - 2: 1
 - 3: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
