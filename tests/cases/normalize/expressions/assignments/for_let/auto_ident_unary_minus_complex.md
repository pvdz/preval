# Preval test case

# auto_ident_unary_minus_complex.md

> normalize > expressions > assignments > for_let > auto_ident_unary_minus_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = -$(100)); ; $(1)) $(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpUnaryArg = $(100);
  a = -tmpUnaryArg;
  let xyz = a;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpUnaryArg = $(100);
  a = -tmpUnaryArg;
  let xyz = a;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: -100
 - 3: 1
 - 4: -100
 - 5: 1
 - 6: -100
 - 7: 1
 - 8: -100
 - 9: 1
 - 10: -100
 - 11: 1
 - 12: -100
 - 13: 1
 - 14: -100
 - 15: 1
 - 16: -100
 - 17: 1
 - 18: -100
 - 19: 1
 - 20: -100
 - 21: 1
 - 22: -100
 - 23: 1
 - 24: -100
 - 25: 1
 - 26: -100
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same