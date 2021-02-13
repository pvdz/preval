# Preval test case

# auto_ident_computed_s-seq_simple.md

> normalize > expressions > statement > logic_and_right > auto_ident_computed_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(100) && (1, 2, b)[$("c")];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpCompObj = b;
  const tmpCompProp = $('c');
  tmpCompObj[tmpCompProp];
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpCompObj = b;
  const tmpCompProp = $('c');
  tmpCompObj[tmpCompProp];
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 'c'
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same