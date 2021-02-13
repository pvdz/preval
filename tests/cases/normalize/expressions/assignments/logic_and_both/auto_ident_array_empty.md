# Preval test case

# auto_ident_array_empty.md

> normalize > expressions > assignments > logic_and_both > auto_ident_array_empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = []) && (a = []));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = [];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpNestedComplexRhs = [];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpNestedComplexRhs = [];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: []
 - 2: []
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same