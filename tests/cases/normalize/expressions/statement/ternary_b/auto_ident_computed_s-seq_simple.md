# Preval test case

# auto_ident_computed_s-seq_simple.md

> normalize > expressions > statement > ternary_b > auto_ident_computed_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(1) ? (1, 2, b)[$("c")] : $(200);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  1;
  2;
  const tmpCompObj = b;
  const tmpCompProp = $('c');
  tmpCompObj[tmpCompProp];
} else {
  $(200);
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCompObj = b;
  const tmpCompProp = $('c');
  tmpCompObj[tmpCompProp];
} else {
  $(200);
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'c'
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
