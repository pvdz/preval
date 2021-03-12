# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Logic and right > Auto ident computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(100) && (1, 2, $(b))[$("c")];
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(100) && (1, 2, $(b))[$('c')];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpCompProp = $('c');
  tmpCompObj[tmpCompProp];
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpCompProp = $('c');
  tmpCompObj[tmpCompProp];
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { c: '1' }
 - 3: 'c'
 - 4: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
