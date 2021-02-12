# Preval test case

# auto_ident_delete_prop_s-seq.md

> normalize > expressions > statement > logic_or_right > auto_ident_delete_prop_s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
$(100) || delete ($(1), $(2), x).y;
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
} else {
  $(1);
  $(2);
  const tmpDeleteObj = x;
  delete tmpDeleteObj.y;
}
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
} else {
  $(1);
  $(2);
  const tmpDeleteObj = x;
  delete tmpDeleteObj.y;
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, { y: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
