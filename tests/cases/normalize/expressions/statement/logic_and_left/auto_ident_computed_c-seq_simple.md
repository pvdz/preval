# Preval test case

# auto_ident_computed_c-seq_simple.md

> normalize > expressions > statement > logic_and_left > auto_ident_computed_c-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
(1, 2, $(b))[$("c")] && $(100);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
1;
2;
const tmpCompObj = $(b);
const tmpCompProp = $('c');
const tmpIfTest = tmpCompObj[tmpCompProp];
if (tmpIfTest) {
  $(100);
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpCompProp = $('c');
const tmpIfTest = tmpCompObj[tmpCompProp];
if (tmpIfTest) {
  $(100);
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 100
 - 4: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
