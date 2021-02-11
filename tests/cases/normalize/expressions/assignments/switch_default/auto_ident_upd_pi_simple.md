# Preval test case

# auto_ident_upd_pi_simple.md

> normalize > expressions > assignments > switch_default > auto_ident_upd_pi_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = ++b;
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
  let tmpFallthrough = false;
  {
    const tmpNestedCompoundLhs = b;
    const tmpNestedComplexRhs = tmpNestedCompoundLhs + 1;
    b = tmpNestedComplexRhs;
    a = tmpNestedComplexRhs;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
