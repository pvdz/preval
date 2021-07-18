# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident upd i m simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (b--);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = b--;
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  $(100);
  const tmpPostUpdArgIdent = b;
  b = b - 1;
  tmpDoWhileFlag = tmpPostUpdArgIdent;
}
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  $(100);
  const tmpPostUpdArgIdent = b;
  b = b - 1;
  tmpDoWhileFlag = tmpPostUpdArgIdent;
}
const a = { a: 999, b: 1000 };
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }, -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
