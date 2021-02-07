# Preval test case

# auto_ident_s-seq.md

> normalize > expressions > statement > for_of_right > auto_ident_s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let x of ($(1), $(2), x));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  $(1);
  $(2);
  const tmpForOfDeclRhs = x_1;
  let x_1;
  for (x_1 of tmpForOfDeclRhs) {
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpForOfDeclRhs = x_1;
let x_1;
for (x_1 of tmpForOfDeclRhs) {
}
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: Same

Final output calls: Same
