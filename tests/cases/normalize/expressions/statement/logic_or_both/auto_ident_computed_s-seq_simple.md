# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
(1, 2, b)[$("c")] || (1, 2, b)[$("c")];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpCompProp = $('c');
const tmpIfTest = tmpCompObj[tmpCompProp];
if (tmpIfTest) {
} else {
  const tmpCompObj$1 = b;
  const tmpCompProp$1 = $('c');
  tmpCompObj$1[tmpCompProp$1];
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const a = { a: 999, b: 1000 };
const tmpCompProp = $('c');
const tmpIfTest = b[tmpCompProp];
if (tmpIfTest) {
} else {
  const tmpCompProp$1 = $('c');
  b[tmpCompProp$1];
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
