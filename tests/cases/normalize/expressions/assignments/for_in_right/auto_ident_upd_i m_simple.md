# Preval test case

# auto_ident_upd_i m_simple.md

> normalize > expressions > assignments > for_in_right > auto_ident_upd_i m_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (let x in (a = b--));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  let tmpForInDeclRhs;
  const tmpPostUpdArgIdent = b;
  b = b - 1;
  const tmpNestedComplexRhs = tmpPostUpdArgIdent;
  a = tmpNestedComplexRhs;
  tmpForInDeclRhs = tmpNestedComplexRhs;
  let x;
  for (x in tmpForInDeclRhs) {
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
 - 1: 1, 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
