# Preval test case

# auto_ident_unary_void_simple.md

> normalize > expressions > assignments > while > auto_ident_unary_void_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
while ((a = void arg)) $(100);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: undefined, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
