# Preval test case

# auto_ident_unary_tilde_complex.md

> normalize > expressions > assignments > for_let > auto_ident_unary_tilde_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = ~$(100)); ; $(1)) $(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
a = ~tmpUnaryArg;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
a = ~tmpUnaryArg;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: -101
 - 3: 1
 - 4: -101
 - 5: 1
 - 6: -101
 - 7: 1
 - 8: -101
 - 9: 1
 - 10: -101
 - 11: 1
 - 12: -101
 - 13: 1
 - 14: -101
 - 15: 1
 - 16: -101
 - 17: 1
 - 18: -101
 - 19: 1
 - 20: -101
 - 21: 1
 - 22: -101
 - 23: 1
 - 24: -101
 - 25: 1
 - 26: -101
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
