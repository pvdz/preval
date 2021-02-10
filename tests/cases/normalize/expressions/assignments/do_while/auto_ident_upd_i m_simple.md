# Preval test case

# auto_ident_upd_i m_simple.md

> normalize > expressions > assignments > do_while > auto_ident_upd_i m_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = b--));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpDoWhileTest;
do {
  $(100);
  const tmpPostUpdArgIdent = b;
  b = b - 1;
  const tmpNestedComplexRhs = tmpPostUpdArgIdent;
  a = tmpNestedComplexRhs;
  tmpDoWhileTest = tmpNestedComplexRhs;
} while (tmpDoWhileTest);
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 0, -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
