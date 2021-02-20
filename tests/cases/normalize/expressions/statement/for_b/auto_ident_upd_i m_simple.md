# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Statement > For b > Auto ident upd i m simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (; b--; $(1));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpPostUpdArgIdent = b;
  b = b - 1;
  const tmpIfTest = tmpPostUpdArgIdent;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
const a = { a: 999, b: 1000 };
while (true) {
  const tmpPostUpdArgIdent = b;
  b = b - 1;
  if (tmpPostUpdArgIdent) {
    $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
