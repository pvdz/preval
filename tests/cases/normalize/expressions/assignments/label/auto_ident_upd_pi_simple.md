# Preval test case

# auto_ident_upd_pi_simple.md

> normalize > expressions > assignments > label > auto_ident_upd_pi_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
label: a = ++b;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
label: {
  const tmpNestedCompoundLhs = b;
  const tmpNestedComplexRhs = tmpNestedCompoundLhs + 1;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
}
$(a, b);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
label: {
  const tmpNestedCompoundLhs = b;
  const tmpNestedComplexRhs = tmpNestedCompoundLhs + 1;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
}
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 2, 1
 - eval returned: undefined
