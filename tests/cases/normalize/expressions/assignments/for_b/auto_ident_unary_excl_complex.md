# Preval test case

# auto_ident_unary_excl_complex.md

> normalize > expressions > assignments > for_b > auto_ident_unary_excl_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = !$(100)); $(1));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpUnaryArg = $(100);
    a = !tmpUnaryArg;
    let tmpIfTest = a;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpUnaryArg = $(100);
    a = !tmpUnaryArg;
    let tmpIfTest = a;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same