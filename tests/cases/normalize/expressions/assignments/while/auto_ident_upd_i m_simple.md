# Preval test case

# auto_ident_upd_i m_simple.md

> normalize > expressions > assignments > while > auto_ident_upd_i m_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
while ((a = b--)) $(100);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpPostUpdArgIdent = b;
  b = b - 1;
  a = tmpPostUpdArgIdent;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpPostUpdArgIdent = b;
  b = b - 1;
  a = tmpPostUpdArgIdent;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 0, -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same