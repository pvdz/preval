# Preval test case

# auto_ident_delete_prop_s-seq.md

> normalize > expressions > statement > logic_and_both > auto_ident_delete_prop_s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
delete ($(1), $(2), x).y && delete ($(1), $(2), x).y;
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = x;
const tmpIfTest = delete tmpDeleteObj.y;
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteObj$1 = x;
  delete tmpDeleteObj$1.y;
}
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = x;
const tmpIfTest = delete tmpDeleteObj.y;
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteObj$1 = x;
  delete tmpDeleteObj$1.y;
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 2
 - 5: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
