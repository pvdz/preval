# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Statement > Do while > Auto ident upd mi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (--b);
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
    tmpDoWhileFlag = --b;
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
  const tmpNestedCompoundLhs = b;
  const tmpNestedComplexRhs = tmpNestedCompoundLhs - 1;
  b = tmpNestedComplexRhs;
  tmpDoWhileFlag = tmpNestedComplexRhs;
}
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  $(100);
  const tmpNestedComplexRhs = b - 1;
  b = tmpNestedComplexRhs;
  tmpDoWhileFlag = tmpNestedComplexRhs;
}
const a = { a: 999, b: 1000 };
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
