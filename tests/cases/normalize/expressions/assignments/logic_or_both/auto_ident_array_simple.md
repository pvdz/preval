# Preval test case

# auto_ident_array_simple.md

> normalize > expressions > assignments > logic_or_both > auto_ident_array_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [1, 2, 3]) || (a = [1, 2, 3]));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = [1, 2, 3];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNestedComplexRhs = [1, 2, 3];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [1, 2, 3];
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNestedComplexRhs = [1, 2, 3];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - 2: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same