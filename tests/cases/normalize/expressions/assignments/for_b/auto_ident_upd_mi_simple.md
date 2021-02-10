# Preval test case

# auto_ident_upd_mi_simple.md

> normalize > expressions > assignments > for_b > auto_ident_upd_mi_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (; (a = --b); $(1));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  while (true) {
    let tmpIfTest;
    let tmpNestedComplexRhs;
    const tmpNestedCompoundLhs = b;
    const tmpNestedComplexRhs$1 = tmpNestedCompoundLhs - 1;
    b = tmpNestedComplexRhs$1;
    tmpNestedComplexRhs = tmpNestedComplexRhs$1;
    a = tmpNestedComplexRhs;
    tmpIfTest = tmpNestedComplexRhs;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
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
 - 1: 0, 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
