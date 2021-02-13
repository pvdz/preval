# Preval test case

# auto_ident_unary_excl_simple.md

> normalize > expressions > statement > while > auto_ident_unary_excl_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
while (!arg) $(100);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
while (true) {
  if (arg) {
    break;
  } else {
    $(100);
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
while (true) {
  if (arg) {
    break;
  } else {
    $(100);
  }
}
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same