# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> normalize > expressions > statement > ternary_c > auto_ident_delete_computed_s-seq_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : delete ($(1), $(2), x)[$("y")];
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  $(1);
  $(2);
  const tmpDeleteCompObj = x;
  const tmpDeleteCompProp = $('y');
  delete tmpDeleteCompObj[tmpDeleteCompProp];
}
$(a, x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: 'y'
 - 5: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
