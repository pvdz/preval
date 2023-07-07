# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Statement > For let > Auto ident unary tilde complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = ~$(100); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = ~$(100);
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
let xyz = ~tmpUnaryArg;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const xyz = ~tmpUnaryArg;
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(xyz);
  $(1);
}
const a = { a: 999, b: 1000 };
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
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
