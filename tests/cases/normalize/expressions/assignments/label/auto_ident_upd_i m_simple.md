# Preval test case

# auto_ident_upd_i m_simple.md

> normalize > expressions > assignments > label > auto_ident_upd_i m_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
label: a = b--;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  const tmpPostUpdArgIdent = b;
  b = b - 1;
  a = tmpPostUpdArgIdent;
}
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = b;
b = b - 1;
a = tmpPostUpdArgIdent;
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1, 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
