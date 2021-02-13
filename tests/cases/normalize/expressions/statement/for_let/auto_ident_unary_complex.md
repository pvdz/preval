# Preval test case

# auto_ident_unary_complex.md

> normalize > expressions > statement > for_let > auto_ident_unary_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let xyz = typeof $(x); ; $(1)) $(xyz);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  const tmpUnaryArg = $(x);
  let xyz = typeof tmpUnaryArg;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  const tmpUnaryArg = $(x);
  let xyz = typeof tmpUnaryArg;
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number'
 - 3: 1
 - 4: 'number'
 - 5: 1
 - 6: 'number'
 - 7: 1
 - 8: 'number'
 - 9: 1
 - 10: 'number'
 - 11: 1
 - 12: 'number'
 - 13: 1
 - 14: 'number'
 - 15: 1
 - 16: 'number'
 - 17: 1
 - 18: 'number'
 - 19: 1
 - 20: 'number'
 - 21: 1
 - 22: 'number'
 - 23: 1
 - 24: 'number'
 - 25: 1
 - 26: 'number'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same